from fastapi import APIRouter, HTTPException, Depends, status
from app.db.session import AsyncSession
from app.db.dependencies import get_db
from app.schemas.user import UserOut, UserUpdate
from sqlalchemy import select
from app.db.models.user import User, UserAddress
from sqlalchemy.orm import selectinload


router = APIRouter()

@router.get("/api/users", response_model=list[UserOut])
async def get_all_users(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User))
    users = result.scalars().unique().all()
    if not users:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No user has been found"
        )
    return users

@router.get("/api/user/{user_id}", response_model=UserOut)
async def get_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user

@router.delete("/api/user/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    await db.delete(user)
    await db.commit()
    return

@router.patch("/api/user/{user_id}", response_model=UserOut, status_code=status.HTTP_200_OK)
async def update_user(user_id: int, data: UserUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    user_dict = data.model_dump(exclude={'addresses'})
    for key, value in user_dict.items():
        setattr(user, key, value)
    if data.addresses:
        user.addresses = [UserAddress(**addr.model_dump()) for addr in data.addresses]
    db.add(user)
    await db.commit()
    await db.refresh(user)
    user = await db.execute(select(User).options(selectinload(User.addresses)).where(User.id == user.id))
    user = user.scalar_one()
    return user