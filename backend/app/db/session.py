from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

SQL_URL = "postgresql+asyncpg://postgres:gumelargun13@localhost:5432/caufi"
engine = create_async_engine(SQL_URL, echo=False)
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)
