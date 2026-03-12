from pydantic import BaseModel, ConfigDict,field_validator, validator
from datetime import datetime


class ProductCreate(BaseModel):
    name: str
    sku: str
    reorder_level: int

    @validator("name")
    def validate_name(cls, v):
        if not v or not v.strip():
            raise ValueError("Product name cannot be empty")
        return v.strip()

    @validator("sku")
    def validate_sku(cls, v):
        if not v or not v.strip():
            raise ValueError("SKU cannot be empty")
        return v.strip()

    @validator("reorder_level")
    def validate_reorder_level(cls, v):
        if v < 0:
            raise ValueError("Reorder level cannot be negative")
        return v


class ProductResponse(BaseModel):
    id: int
    name: str
    sku: str
    reorder_level: int
    current_stock: int

    model_config = ConfigDict(from_attributes=True)


class StockMovementCreate(BaseModel):
    product_id: int
    delta: int
    reason: str | None = None

    @field_validator("delta")
    @classmethod
    def validate_delta(cls, v):
        if not isinstance(v, int):
            raise ValueError("Delta must be an integer")
        if v == 0:
            raise ValueError("Delta cannot be zero")
        return v


class StockMovementResponse(BaseModel):
    id: int
    product_id: int
    delta: int
    reason: str | None = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)