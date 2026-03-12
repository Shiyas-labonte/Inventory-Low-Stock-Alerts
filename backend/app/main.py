from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from app.db import get_db
from sqlalchemy import func
from app.models import Product, StockMovement
from app.schemas import ProductCreate, ProductResponse, StockMovementCreate, StockMovementResponse

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/products", response_model=ProductResponse)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):

        existing = db.query(Product).filter((Product.name == product.name) | (Product.sku == product.sku)).first()
        if existing:
          raise HTTPException(status_code=409,detail="Product with same name or SKU already exists")
        new_product = Product(
            name=product.name.strip(),
            sku=product.sku.strip(),
            reorder_level=product.reorder_level
        )
        db.add(new_product)
        db.commit()
        db.refresh(new_product)
        return {
            "id": new_product.id,
            "name": new_product.name,
            "sku": new_product.sku,
            "reorder_level": new_product.reorder_level,
            "current_stock": 0
        }

@app.post("/stock-movements", response_model = StockMovementResponse)
def create_stock_movement(data: StockMovementCreate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == data.product_id).first()
    if not product:
        raise HTTPException(status_code=404,detail="Product not found")
    new_movement = StockMovement(
        product_id = data.product_id,
        delta = data.delta,
        reason = data.reason
    )
    db.add(new_movement)
    db.commit()
    db.refresh(new_movement)
    return new_movement
@app.get("/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):

    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    current_stock = db.query(func.sum(StockMovement.delta)).filter(StockMovement.product_id == product_id).scalar()
    if current_stock is None: current_stock = 0

    return {
        "id": product.id,
        "name": product.name,
        "sku": product.sku,
        "reorder_level": product.reorder_level,
        "current_stock": current_stock
    }

@app.get("/products", response_model=list[ProductResponse])
def get_products(low_stock: bool = False, db: Session = Depends(get_db)):

    query = (
        db.query(Product.id,Product.name,Product.sku,Product.reorder_level,func.coalesce(func.sum(StockMovement.delta), 0).label("current_stock"))
          .outerjoin(StockMovement, Product.id == StockMovement.product_id)
          .group_by(Product.id)
    )
    if low_stock:
        query = query.having(func.coalesce(func.sum(StockMovement.delta), 0) <= Product.reorder_level)

    results = query.all()
    return results
@app.get("/movements/{product_id}")
def get_product_movements(product_id: int, db: Session = Depends(get_db)):
    movements = db.query(StockMovement).filter(StockMovement.product_id == product_id).order_by(StockMovement.id.asc()).all()
    return movements
