from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Boolean,
    Text,
    ForeignKey,
    Date,
    func,
)
from sqlalchemy.orm import relationship
from app.db.base import Base

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    first_name = Column(String(100), nullable=False)
    middle_name = Column(String(100), nullable=True)
    last_name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, unique=True, index=True)
    phone_number = Column(String(50), nullable=True, index=True)
    password = Column(String(1000), nullable=True)
    birthday = Column(Date, nullable=True)
    register_time = Column(DateTime(), server_default=func.now())
    is_active = Column(Boolean(), default=True)
    image = Column(String(155), nullable=True)
    addresses = relationship(
        "UserAddress",
        back_populates="user",
        cascade="all, delete-orphan",
        lazy="selectin",
    )
    password_reset_token = relationship(
        "PasswordReset",
        back_populates="user",
        cascade="all, delete-orphan",
        lazy="selectin",
    )

class UserAddress(Base):
    __tablename__ = "user_address"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    label = Column(String(50), nullable=False)
    recipient_name = Column(String(100), nullable=False)
    recipient_number = Column(String(50), nullable=False)
    province = Column(String(100), nullable=False, index=True)
    city = Column(String(100), nullable=False, index=True)
    district = Column(String(100), nullable=False)
    sub_district = Column(String(100), nullable=False)
    full_address = Column(Text, nullable=False)
    notes_for_courier = Column(Text, nullable=True)
    is_default = Column(Boolean, default=False)
    user = relationship("User", back_populates="addresses")
    
class PasswordReset(Base):
    __tablename__ = "password_reset"
    id = Column(Integer, primary_key=True)
    token = Column(String(255), nullable=False, unique=True, index=True)
    expire = Column(DateTime(), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    user = relationship("User", back_populates="password_reset_token")

