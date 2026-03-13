import uuid
def test_create_product(client):
    uid = uuid.uuid4().hex[:6]
    response = client.post("/products",
        json={
            "name": f"Test Product {uid}",
            "sku": f"TEST-{uid}",
            "reorder_level": 5
        },
    )

    assert response.status_code == 200
    data = response.json()
    assert data["name"] == f"Test Product {uid}"
    assert data["sku"] == f"TEST-{uid}"

def test_duplicate_sku(client):
    payload = {
        "name": "Test Product",
        "sku": "TEST001",
        "reorder_level": 5
    }
    client.post("/products", json=payload)
    response = client.post("/products", json=payload)

    assert response.status_code == 409
def test_stock_movement_updates_stock(client):
    sku = f"TEST-{uuid.uuid4().hex[:6]}"
    product = client.post("/products",
        json={
            "name": f"Stock Product {sku}",
            "sku": sku,
            "reorder_level": 5
        },
    ).json()

    product_id = product["id"]
    client.post("/stock-movements",
        json={
            "product_id": product_id,
            "delta": 10,
            "reason": "Initial stock"
        },
    )
    client.post("/stock-movements",
        json={
            "product_id": product_id,
            "delta": -3,
            "reason": "Sale"
        },
    )

    response = client.get(f"/products/{product_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["current_stock"] == 7    

def test_low_stock_filter(client):
    sku = f"TEST-{uuid.uuid4().hex[:6]}"

    product = client.post("/products",
        json={
            "name": f"Low Stock Item {sku}",
            "sku": sku,
            "reorder_level": 10
        },
    ).json()
    product_id = product["id"]
    client.post( "/stock-movements",
        json={
            "product_id": product_id,
            "delta": 3,
            "reason": "Initial stock"
        },
    )
    response = client.get("/products?low_stock=true")
    assert response.status_code == 200
    products = response.json()
    assert any(p["id"] == product_id for p in products)

def test_product_not_found(client):
    response = client.get("/products/99999")
    assert response.status_code == 404   