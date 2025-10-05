from app.core.utils import hash_password
from app.db.models.user import User
from app.db.session import AsyncSession
from sqlalchemy import select


async def create_user(
    db: AsyncSession, first_name: str, last_name: str, email: str, password: str | None
) -> User:
    hashed_password = hash_password(password) if password else None
    user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=hashed_password,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


async def get_user(
    db: AsyncSession, user_id: int | None = None, user_email: str | None = None
) -> User | None:
    if user_id:
        result = await db.scalar(select(User).where(User.id == user_id))
    elif user_email:
        result = await db.scalar(select(User).where(User.email == user_email))
    else:
        return None
    return result
