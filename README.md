# Inventory + Low Stock Alerts

A full-stack inventory management system that allows users to manage products, track stock movements (inbound/outbound), and receive alerts when product stock falls below the reorder level.

The system consists of:

* **Backend:** FastAPI + PostgreSQL
* **Frontend:** React + Redux Toolkit
* **Testing:** Pytest (backend), React Testing Library (frontend unit test), Playwright (E2E)

---

# Project Features

* Product creation and management
* Track inbound and outbound stock movements
* Automatic stock updates
* Low stock alerts when stock falls below reorder level
* Search products by name or SKU
* Toggle to display only low-stock products
* REST API with OpenAPI/Swagger documentation
* Automated testing for backend, frontend, and end-to-end flow

---

# Project Structure

```
Inventory-Low-Stock-Alerts
│
├── backend
│   ├── app
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models
│   │   ├── schemas
│   │   ├── routers
│   │   └── services
│   │
│   ├── tests
│   │   └── test_products.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   └── CreateProductModal.jsx
|   |   |    ├── CreateProductModal.test.js 
│   │   │    ├── StockMovementForm.jsx
│   │   │
│   │   ├── pages
│   │   │   └── ProductList.jsx
|   |   |   ├── ProductDetail.jsx
|   |   |    ├── ProductMovement.js
│   │   │
│   │   ├── features
│   │   │   └── products
│   │   │       ├── productSlice.js
│   │   │       └── productThunks.js
│   │   │
│   │   ├── services
│   │   │   └── api.js
│   │   │
│   │
│   ├── tests
│   │   └── stock-movement.spec.js
│   │
│   └── package.json
│
└── README.md
```

---

# System Requirements

Install the following software before running the project:

* Python 3.11
* Node.js
* PostgreSQL
* Git

---

# Installation Guide

## 1 Download Project

Download the project ZIP from Git and extract it.

Example location:

```
C:\Inventory-Low-Stock-Alerts
```

---

# Database Setup

Install PostgreSQL from the official website.

Recommended version:

PostgreSQL 18

During installation:

* Set **port**
* Set **password**
* Add PostgreSQL to **environment variables**

After installation:

Create a database for the project.

Example:

```
inventory_db
```

---

# Create Environment File

Inside the **backend folder**, create a file named:

```
.env
```

Add database credentials:

```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/inventory_db
```

Ensure the database name matches the one created in PostgreSQL.

---

# Backend Setup (FastAPI)

Open terminal.

Navigate to backend folder:

```
cd Inventory-Low-Stock-Alerts/backend
```

---

## Install Python

If Python is not installed, install Python 3.11:

```
winget install --id Python.Python.3.11 -e
```

---

## Create Virtual Environment

```
py -3.11 -m venv venv
```

or

```
python -m venv venv
```

---

## Activate Virtual Environment

```
venv\Scripts\activate
```

---

## Install Backend Dependencies

```
pip install -r requirements.txt
```

---

## Run Backend Server

```
uvicorn app.main:app --reload
```

Backend will run at:

```
http://localhost:8000
```

Swagger API documentation:

```
http://localhost:8000/docs
```

---

# Frontend Setup (React)

Install Node.js if not installed.

Open a new terminal.

Navigate to frontend folder:

```
cd Inventory-Low-Stock-Alerts/frontend
```

Install node modules:

```
npm install
```

Run frontend server:

```
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

# API Documentation

Swagger documentation is automatically available at:

```
http://localhost:8000/docs
```

This allows testing of all API endpoints.

---

# Backend Tests (Pytest)

Backend tests are implemented using **pytest**.

Run tests:

```
pytest
```

Expected output example:

```
================== test session starts ==================

collected 5 items

tests/test_products.py ..... 

================== 5 passed in 1.25s ==================
```

---

# Frontend Unit Test

A frontend unit test is implemented using **React Testing Library**.

Test file:

```
src/components/CreateProductModal.test.js
```

Run unit tests:

```
npm test
```

Example output:

```
PASS src/components/CreateProductModal.test.js
✓ renders CreateProductModal dialog
```

This test verifies that the CreateProductModal component renders correctly.

---

# End-to-End Test (Playwright)

Playwright is used for end-to-end testing of the UI.

Install Playwright browsers:

```
npx playwright install
```

This downloads:

* Chromium
* Firefox
* WebKit

Run the E2E test:

```
npx playwright test
```

Example output:

```
Running 1 test

✓ stock movement updates UI

1 passed
```

---

# Manual Test Checklist

The following manual test cases were verified:

1. Create new product successfully
2. Duplicate SKU creation returns error
3. Search product by name
4. Search product by SKU
5. Toggle low-stock filter
6. Low-stock products display alert icon
7. Track stock movement
8. Inbound movement increases stock
9. Outbound movement decreases stock
10. Invalid stock delta rejected
11. Non-existent product ID returns 404
12. Pagination works correctly
13. Product creation modal opens and closes correctly
14. UI updates after stock movement
15. API endpoints return expected responses

---

# Tradeoffs / Design Decisions

* **FastAPI** was chosen for its speed and automatic API documentation.
* **Redux Toolkit** was used for simplified state management.
* **PostgreSQL** provides reliable relational data storage.
* **Playwright** was chosen for modern cross-browser testing.
* API calls are abstracted through a service layer for better maintainability.

---

# Technologies Used

Backend:

* FastAPI
* SQLAlchemy
* PostgreSQL
* Pytest

Frontend:

* React
* Redux Toolkit
* Bootstrap

Testing:

* Pytest
* React Testing Library
* Playwright

---

# Notes

Playwright browsers are not included in node_modules, so after cloning the project run:
pytest done for add movement of stock thus need to create a product first

```
npx playwright install
```

---
