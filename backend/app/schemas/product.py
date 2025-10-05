from pydantic import BaseModel, ConfigDict
from datetime import datetime
from app.schemas.to_camel import to_camel

class ProductColor(BaseModel):
    color: str
    hex: str
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

class ProductImage(BaseModel):
    id: int
    image_url: str
    image_size: int
    image_name: str
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

class ProductImageOut(ProductImage):
    id: int
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    
class ProductSize(BaseModel):
    size: str
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

class ProductMaterial(BaseModel):
    material: str
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

class ProductData(BaseModel):
    name: str
    stock: int
    stock_type: str
    shipping_type: str
    motif: str
    material: list[ProductMaterial] | None = None
    regular_price: int
    discount_price: int
    colors: list[ProductColor] | None = None
    images: list[ProductImage] | None = None
    sizes: list[ProductSize] | None = None
    category: str
    product_summary: str
    manufacturer_name: str
    description: str
    care_guide: str
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

class ProductOut(ProductData):
    id: int
    slug: str
    created_at: datetime
    updated_at: datetime
    is_active: bool
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)