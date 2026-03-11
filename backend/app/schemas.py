from pydantic import BaseModel, ConfigDict
from datetime import datetime


class ProductCreate(BaseModel):
    name: str
    sku: str
    reorder_level: int


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


class StockMovementResponse(BaseModel):
    id: int
    product_id: int
    delta: int
    reason: str | None = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)