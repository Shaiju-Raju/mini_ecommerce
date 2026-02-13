# 🛒 E-Commerce Backend Project Summary

## 🧱 Tech Stack
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Role-based Authorization (user / admin)

---

# 📂 Folder Structure

backend/
│
├── controllers/
│   ├── auth.controller.js
│   ├── product.controller.js
│   ├── cart.controller.js
│   └── orders.controller.js
│
├── models/
│   ├── user.model.js
│   ├── product.model.js
│   ├── cart.model.js
│   └── orders.model.js
│
├── routes/
│   ├── users.routes.js
│   ├── product.routes.js
│   ├── cart.routes.js
│   └── orders.routes.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── config/
│   └── db.js
│
├── server.js
└── package.json

---

# 🗄️ Database Tables

## users
- id (PK)
- name
- email
- password
- role (default: "user")

## products
- id (PK)
- title
- price (NUMERIC)
- image_url
- description

## carts
- id (PK)
- user_id (FK → users.id)

## cart_items
- id (PK)
- cart_id (FK → carts.id)
- product_id (FK → products.id)
- quantity

## orders
- id (PK)
- user_id (FK → users.id)
- total
- status (default: "pending")
- created_at

## order_items
- id (PK)
- order_id (FK → orders.id)
- product_id (FK → products.id)
- quantity
- price

---

# 🔐 Authentication Flow

1. User registers / logs in
2. JWT token returned
3. Token stored in frontend
4. Token sent in header:

Authorization: Bearer <token>

---

# 🛡️ Middleware

## authMiddleware
- Verifies JWT
- Attaches decoded user to req.user

## roleMiddleware(role)
- Checks if req.user.role matches required role
- Used for admin-only routes

---

# 📡 API Endpoints

## Auth
POST   /api/auth/register
POST   /api/auth/login

---

## Products
GET    /api/products
GET    /api/products/:id
POST   /api/products        (admin)
PUT    /api/products/:id    (admin)
DELETE /api/products/:id    (admin)

---

## Cart
GET    /api/cart
POST   /api/cart
PUT    /api/cart/:id
DELETE /api/cart/:id
POST   /api/cart/checkout

---

## Orders

GET    /api/orders                 (user: own orders)
GET    /api/orders/:id             (owner or admin)

GET    /api/orders/admin/all       (admin only)
PUT    /api/orders/admin/:id       (admin only)

---

# 🧠 Checkout Logic

1. Get user's cart
2. Fetch cart items
3. Calculate total
4. Insert into orders table
5. Insert into order_items table
6. Clear cart_items

---

# 📌 Current Status

✅ Authentication complete  
✅ Product CRUD complete  
✅ Cart system complete  
✅ Checkout complete  
✅ Order system complete  
❌ Payment integration not added  
❌ Frontend not built yet  

---

# 🎯 Next Step

Build React frontend that consumes this API.
