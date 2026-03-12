# Mini E-Commerce (Full Stack) - Project Summary

## Overview
This repository contains a small full-stack e-commerce app with:
- A **React + Vite** frontend for browsing products, cart, checkout, orders, and an admin dashboard.
- A **Node.js + Express** backend (ESM) backed by **PostgreSQL**, using **JWT** auth and role-based access control.

## Tech Stack
### Frontend
- React (Vite), React Router
- Axios for API calls
- react-toastify for notifications

### Backend
- Node.js (ES modules), Express
- PostgreSQL via `pg`
- Auth: JWT (`jsonwebtoken`), password hashing (`bcrypt`)
- `dotenv` + `cors`

## Repository Layout
- `frontend/`: React app (Vite)
- `backend/`: Express API server + database models/table creation
- `PROJECT_SUMMARY.md`: this file
- `backend/PROJECT_SUMMARY.md`: backend-specific details

## How To Run (Local)
### Prerequisites
- Node.js (recommended: recent LTS)
- PostgreSQL running locally

### Backend
1. Create/update `backend/.env` with the required variables (see Backend section below).
2. Install and run:
   - `cd backend`
   - `npm install`
   - `npm run dev` (or `npm start`)
3. Backend listens on `process.env.PORT` (commonly `3000`).

### Frontend
1. Install and run:
   - `cd frontend`
   - `npm install`
   - `npm run dev`
2. The frontend currently calls APIs using hardcoded `http://localhost:3000/...` URLs in multiple places.

## Frontend Routes (UI)
- `/`: Home (product listing + search via query params)
- `/login`, `/signup`: authentication pages
- `/cart`: cart page (protected user route)
- `/checkout`: shipping + payment selection + place order (protected user route)
- `/orders/:orderId`: order confirmation page (protected user route)
- `/order_history`: list of user orders (protected user route)
- `/order_history/order_details/:id`: order details (protected user route)
- `/admin/dashboard`: admin dashboard (protected admin route)

## Auth + Roles
- Login returns a JWT stored in `localStorage` as `token`.
- Route guards decode the JWT using `jwt-decode`:
  - User-only pages redirect admins to `/admin/dashboard`.
  - Admin-only pages redirect non-admins to `/`.

## Backend API (High Level)
Base URL: `http://localhost:<PORT>/api`

### Users
- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users/profile` (auth)
- `GET /api/users/admin/all` (auth + admin)

### Products
- `GET /api/products` (active products; supports `page`, `limit`, `search`)
- `GET /api/products/:id`
- `GET /api/products/admin` (auth + admin; supports `page`, `limit`, `search`)
- `POST /api/products` (auth + admin)
- `PUT /api/products/:id` (auth + admin)
- `PATCH /api/products/:id/status` (auth + admin)

### Cart + Checkout
- All cart routes require auth (middleware applied at router level).
- `POST /api/cart` (add item)
- `GET /api/cart` (get cart items + totals)
- `PUT /api/cart/:cart_item_id` (update quantity)
- `DELETE /api/cart/:productId` (remove item)
- `POST /api/cart/checkout` (place order; creates order, items, address; clears cart)

### Orders
- `GET /api/orders` (auth; user’s orders)
- `GET /api/orders/:id` (auth; user can only access own; admin can access any)
- `PUT /api/orders/admin/:id` (auth + admin; update order status)
- `GET /api/orders/admin/all` (auth + admin; list all orders)
  - Note: there is a routing-order issue in `backend/src/routes/order.routes.js` where `GET /:id` is declared before `GET /admin/all`, which can shadow the admin route in Express. This should be fixed by moving the admin routes above `/:id`.

### Settings
- `GET /api/settings` (shipping rate/settings)

## Database Notes
- PostgreSQL connection is configured in `backend/src/config/db.js` via environment variables.
- Tables are created on server start in `backend/src/app.js` by calling `create...Table()` functions for products/users/cart/orders/settings.

## Mobile Responsiveness (Frontend)
Mobile-first CSS improvements have been added across:
- Navbar (stacked layout on small screens, compact profile menu, improved desktop alignment)
- Cart, Checkout, Order confirmation, Order history + details
- Admin dashboard: mobile top bar + expandable menu panel
- Toastify: mobile width constraints and spacing for notifications

## Known Issues / Follow-Ups
- Backend: `GET /api/orders/admin/all` can be shadowed by `GET /api/orders/:id` depending on route order.
- Backend: `backend/.env` currently contains secrets; ensure `.env` is not committed to version control and rotate credentials if it ever was.
