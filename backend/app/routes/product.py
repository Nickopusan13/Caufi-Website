from fastapi import APIRouter, HTTPException, status, Depends, UploadFile, Request
from app.schemas.product import ProductOut, ProductData, ProductImageOut
from app.db.session import AsyncSession
from app.db.dependencies import get_db
from app.db.models.product import Product, ProductImage, ProductColor, ProductMaterial, ProductSize
from app.core.utils import get_slug, sanitize_html
from sqlalchemy import select
import os, uuid, shutil
from sqlalchemy.orm import selectinload

router = APIRouter()

@router.get("/product", response_model=list[ProductOut])
async def get_all_product(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Product).options(
            selectinload(Product.images),
            selectinload(Product.colors),
            selectinload(Product.sizes),
            selectinload(Product.material)
        )
    )
    products = result.scalars().unique().all()
    return products

@router.get("/product/{product_id}", response_model=ProductOut)
async def get_product(product_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Product).options(
            selectinload(Product.images),
            selectinload(Product.colors),
            selectinload(Product.sizes),
            selectinload(Product.material)
        ).where(Product.id == product_id)
    )
    products = result.scalar_one_or_none()
    if not products:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Product not found"
        )
    return products

@router.post("/product", response_model=ProductOut, status_code=status.HTTP_201_CREATED)
async def post_product(data: ProductData, db: AsyncSession = Depends(get_db)):
    sanitized_desc = sanitize_html(data.description)
    sanitized_care = sanitize_html(data.care_guide)
    product_dict = data.model_dump(exclude={'images', 'colors', 'sizes', 'material'})
    product_dict["description"] = sanitized_desc
    product_dict["care_guide"] = sanitized_care
    if not product_dict.get("slug"):
        product_dict["slug"] = get_slug(product_dict["name"])
    product = Product(**product_dict)
    db.add(product)
    if data.colors:
        product.colors = [ProductColor(**color.model_dump()) for color in data.colors]
    if data.sizes:
        product.sizes = [ProductSize(**size.model_dump()) for size in data.sizes]
    if data.material:
        product.material = [ProductMaterial(**material.model_dump()) for material in data.material]
    await db.commit()
    await db.refresh(product)
    product = await db.execute(
        select(Product)
        .options(
            selectinload(Product.images),
            selectinload(Product.colors),
            selectinload(Product.sizes),
            selectinload(Product.material),
        )
        .where(Product.id == product.id)
    )
    product = product.scalar_one()
    return product

def get_upload():
    upload_dir = "uploads/product_images"
    os.makedirs(upload_dir, exist_ok=True)
    return upload_dir

@router.post("/product/{product_id}/images", response_model=list[ProductImageOut])
async def upload_images(request: Request,product_id:int, files: list[UploadFile], db: AsyncSession = Depends(get_db), upload_dir: str = Depends(get_upload)):
    result = await db.execute(select(Product).where(Product.id == product_id))
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    upload_images = []
    for file in files:
        file_extension = os.path.splitext(file.filename)[1]
        unique_name = f"{uuid.uuid4()}{file_extension}"
        file_location = os.path.join(upload_dir, unique_name)
        try:
            with open(file_location, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to save file name {file.filename}"
            )
        finally:
            file.file.close()
        image_url = f"{request.base_url}{file_location.replace(os.sep, '/')}"
        product_image = ProductImage(product_id=product_id, image_url=image_url, image_size=file.size, image_name=file.filename)
        db.add(product_image)
        upload_images.append(product_image)
    try:
        await db.commit()
    except Exception as e:
        await db.rollback()
        print(f"Error committing to database: {e}")
        for img in upload_images:
            if os.path.exists(img.image_url.strip('/')):
                os.remove(img.image_url.strip('/'))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save image metadata to the database."
        ) 
    return upload_images

@router.delete("/product/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(product_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Product).options(
            selectinload(Product.images),
            selectinload(Product.colors),
            selectinload(Product.sizes),
            selectinload(Product.material)
        ).where(Product.id == product_id)
    )
    products = result.scalar_one_or_none()
    if not products:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    await db.delete(products)
    await db.commit()
    return

@router.patch("/product/{product_id}", response_model=ProductOut, status_code=status.HTTP_200_OK)
async def update_product(product_id: int, data: ProductData, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Product).options(
            selectinload(Product.images),
            selectinload(Product.colors),
            selectinload(Product.sizes),
            selectinload(Product.material)
        ).where(Product.id == product_id)
    )
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    sanitized_desc = sanitize_html(data.description)
    sanitized_care = sanitize_html(data.care_guide)
    product_dict = data.model_dump(exclude={'images', 'colors', 'sizes', 'material'})
    product_dict["description"] = sanitized_desc
    product_dict["care_guide"] = sanitized_care
    if not product_dict.get("slug"):
        product_dict["slug"] = get_slug(product_dict["name"])
    for key, value in product_dict.items():
        setattr(product, key, value)
    if data.colors:
        product.colors = [ProductColor(**color.model_dump()) for color in data.colors]
    if data.sizes:
        product.sizes = [ProductSize(**size.model_dump()) for size in data.sizes]
    if data.material:
        product.material = [ProductMaterial(**material.model_dump()) for material in data.material]
    db.add(product)
    await db.commit()
    await db.refresh(product)
    product = await db.execute(
        select(Product)
        .options(
            selectinload(Product.images),
            selectinload(Product.colors),
            selectinload(Product.sizes),
            selectinload(Product.material),
        )
        .where(Product.id == product.id)
    )
    product = product.scalar_one()
    return product

@router.delete("/product/images/{image_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_image(image_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ProductImage).where(ProductImage.id == image_id))
    image = result.scalar_one_or_none()
    if not image:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Image not found"
        )
    image_path = os.path.join("uploads", os.path.basename(image.image_url)) if image else None
    if image_path and os.path.exists(image_path):
        os.remove(image_path)
    await db.delete(image)
    await db.commit()
    return