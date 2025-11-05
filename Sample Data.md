# Retail Store Database — Sample Data

This document contains the **sample data** used to populate the `retail_store` database for domain example.   

---

## USERS Table

Stores all system users, including both customers and administrators.

| User ID | Full Name       | Role      |
|----------|-----------------|-----------|
| 1 | Sarah Thompson | Customer |
| 2 | James Parker | Customer |
| 3 | Emily Davis | Customer |
| 4 | Michael Brown | Customer |
| 5 | Linda Nguyen | Admin |
| 6 | Daniel White | Admin |

---

## ORDERS Table

Tracks all orders placed by users, including order status and total amount.

| Order ID | User ID | Total Amount | Order Status |
|-----------|----------|---------------|---------------|
| 5001 | 1 | 149.97 | Completed |
| 5002 | 2 | 59.99 | Processing |
| 5003 | 3 | 79.99 | Shipped |
| 5004 | 4 | 129.99 | Completed |
| 5005 | 5 | 49.99 | Processing |
| 5006 | 6 | 24.99 | Completed |

---

## PRODUCTS Table

Contains all products available in the store, along with pricing and stock quantities.

| Product ID | Product Name  | Price | Stock Quantity |
|-------------|----------------|--------|----------------|
| 101 | Denim Jacket | 79.99 | 25 |
| 102 | Graphic Tee | 24.99 | 50 |
| 103 | Slim Fit Jeans | 59.99 | 30 |
| 104 | Summer Dress | 69.99 | 20 |
| 105 | Hoodie | 49.99 | 40 |
| 106 | Winter Coat | 129.99 | 10 |

---

## ORDERDETAILS Table

Links individual products to specific orders and provides subtotal values per line item.

| Order Detail ID | Order ID | Product ID | Quantity | Subtotal |
|------------------|-----------|-------------|-----------|-----------|
| 9001 | 5001 | 101 | 1 | 79.99 |
| 9002 | 5001 | 102 | 2 | 49.98 |
| 9003 | 5001 | 103 | 1 | 59.99 |
| 9004 | 5001 | 104 | 1 | 49.99 |
| 9005 | 5001 | 105 | 1 | 129.99 |
| 9006 | 5001 | 106 | 1 | 69.99 |

---

## INVENTORY Table

Manages product availability and supplier information for restocking purposes.

| Inventory ID | Product ID | Quantity Available | Supplier Name |
|---------------|-------------|--------------------|----------------|
| 1 | 101 | 25 | Urban Threads |
| 2 | 102 | 50 | CottonWear Supply |
| 3 | 103 | 30 | Denim Factory |
| 4 | 104 | 20 | SummerLine Apparel |
| 5 | 105 | 40 | CozyWear Imports |
| 6 | 106 | 10 | WinterStyle Ltd. |

---
