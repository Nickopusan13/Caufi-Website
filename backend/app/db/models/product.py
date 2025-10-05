from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Boolean,
    Text,
    ForeignKey,
    func,
)
from sqlalchemy.orm import relationship
from app.db.base import Base


class Product(Base):
    __tablename__ = "product"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    stock = Column(Integer, default=0)
    stock_type = Column(String(50))
    shipping_type = Column(String(50), nullable=False)
    motif = Column(String(50), nullable=False)
    material = relationship(
        "ProductMaterial", back_populates="product", cascade="all, delete-orphan"
    )
    regular_price = Column(Integer, nullable=False)
    discount_price = Column(Integer, nullable=True)
    colors = relationship(
        "ProductColor", back_populates="product", cascade="all, delete-orphan"
    )
    images = relationship(
        "ProductImage", back_populates="product", cascade="all, delete-orphan"
    )
    sizes = relationship(
        "ProductSize", back_populates="product", cascade="all, delete-orphan"
    )
    category = Column(String(100), nullable=True)
    product_summary = Column(Text, nullable=False)
    manufacturer_name = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    care_guide = Column(Text, nullable=True)
    slug = Column(String(100), nullable=False, unique=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
    is_active = Column(Boolean(), default=True, nullable=False)
    cart_items = relationship("CartItem", back_populates="product", lazy="selectin")


class ProductImage(Base):
    __tablename__ = "product_image"
    id = Column(Integer, primary_key=True)
    image_url = Column(String(255), nullable=False)
    image_size = Column(Integer, nullable=False)
    image_name = Column(String(255), nullable=False)
    product_id = Column(Integer, ForeignKey("product.id"))
    product = relationship("Product", back_populates="images", lazy="selectin")

class ProductColor(Base):
    __tablename__ = "product_color"
    id = Column(Integer, primary_key=True)
    color = Column(String(50), nullable=False)
    hex = Column(String(100), nullable=False)
    product_id = Column(Integer, ForeignKey("product.id"))
    product = relationship("Product", back_populates="colors", lazy="selectin")

class ProductSize(Base):
    __tablename__ = "product_size"
    id = Column(Integer, primary_key=True)
    size = Column(String(50), nullable=False)
    product_id = Column(Integer, ForeignKey("product.id"))
    product = relationship("Product", back_populates="sizes", lazy="selectin")

class ProductMaterial(Base):
    __tablename__ = "product_material"
    id = Column(Integer, primary_key=True)
    material = Column(String(50), nullable=False)
    product_id = Column(Integer, ForeignKey("product.id"))
    product = relationship("Product", back_populates="material", lazy="selectin")
