# Mini E-Commerce (Full Stack) - Project Summary

## 📌 Overview
This repository contains a full-stack e-commerce application built with a modern web stack. It provides a complete shopping experience, including product browsing, cart management, secure checkout with an integrated payment gateway (Razorpay), order tracking, and a comprehensive admin dashboard for managing products and orders.

## 🚀 Tech Stack

### Frontend
- **Framework:** React.js (Bootstrapped with Vite)
- **Routing:** React Router v7
- **Styling:** Vanilla CSS (App.css, index.css)
- **State Management:** React Context API (`CartContext`)
- **HTTP Client:** Axios
- **Notifications:** React Toastify
- **Token Decoding:** `jwt-decode`

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** PostgreSQL (via `pg` library)
- **Authentication:** JSON Web Tokens (JWT) & `bcrypt` for password hashing
- **Payment Gateway:** Razorpay Integration
- **Middlewares:** CORS, dotenv

## 📂 Folder Structure

```text
mini-ecommerce/
├── backend/                        # Node.js + Express Backend
│   ├── src/
│   │   ├── config/                 # Database connection config (db.js)
│   │   ├── controllers/            # Route logic (cart, products, users, etc.)
│   │   ├── middlewares/            # Custom middlewares (auth & role verification)
│   │   ├── models/                 # PostgreSQL table creation statements & queries
│   │   ├── routes/                 # API route declarations
│   │   ├── app.js                  # Express app setup and global middlewares
│   │   └── server.js               # Application entry point (starts server)
│   ├── .env                        # Backend environment variables
│   └── package.json                # Backend dependencies and scripts
│
├── frontend/                       # React Frontend (Vite)
│   ├── src/
│   │   ├── assets/                 # Images, icons, and static files
│   │   ├── Components/             # Reusable UI components (Navbar, CartItem, ProductCard, etc.)
│   │   ├── Pages/                  # Main views (Home, Login, Cart, Checkout, Orders)
│   │   │   └── Admin/              # Admin-specific pages and components
│   │   ├── Routes/                 # Route guards (UserRoute, AdminRoute, PublicRoute, etc.)
│   │   ├── utils/                  # Helper formatting functions (currency.js, date.js)
│   │   ├── App.jsx                 # Main routing logic and Layout wrapper
│   │   ├── main.jsx                # React DOM render entry point
│   │   ├── index.css               # Global CSS styles
│   │   └── App.css                 # Application-wide component CSS
│   ├── .env                        # Frontend environment variables
│   ├── vite.config.js              # Vite bundler configuration
│   └── package.json                # Frontend dependencies and scripts
│
└── PROJECT_SUMMARY.md              # This documentation file
```

## 🔄 Application Flow & Architecture

1. **Authentication & Authorization (JWT & Roles):** 
   - Users and Admins authenticate via the `/login` page. The backend returns a JWT token which is securely stored in `localStorage`.
   - Route guards (`UserRoute`, `AdminRoute`, `PublicRoute`, `RoleRedirect`) analyze the decoded JWT to enforce Role-Based Access Control on the client side.

2. **User Experience:**
   - **Browsing:** Users land on the `Home` page, which fetches active products from the backend. They can filter, search, and navigate through paginated product listings.
   - **Cart Management:** The `CartContext` and APIs manage item additions. Users can review, adjust quantities, or remove items from their remote cart.
   - **Checkout & Payment:** Users confirm their shipping addresses and proceed to payment integration powered by Razorpay. Upon processing, the backend creates an order record and clears the cart.
   - **Order History:** Users can track and view details of their previous and current orders via the `OrderHistory` and `OrderDetails` pages.

3. **Admin Experience:**
   - Admin accounts are automatically redirected to `AdminDashboard`. From the portal, they can:
     - Add new products to the catalog (`AddProduct`).
     - View, edit, or remove existing products via interactive modals (`ViewProducts`, `EditProductPopup`).
     - View all customer orders across the platform and update their fulfillment status (`Orders`).

## 🔌 API Endpoints (High Level)

*Base URL: `http://localhost:<PORT>/api`*

### Users & Auth
- `POST /api/users/register` - Create a new user account.
- `POST /api/users/login` - Authenticate and receive a JWT.
- `GET /api/users/profile` - Fetch the logged-in user's profile *[Auth Required]*.
- `GET /api/users/admin/all` - List all users in the system *[Admin Only]*.

### Products
- `GET /api/products` - List all active products (supports `page`, `limit`, `search`).
- `GET /api/products/:id` - Get specific product details.
- `GET /api/products/admin` - List all products for the admin panel *[Admin Only]*.
- `POST /api/products` - Create a new product *[Admin Only]*.
- `PUT /api/products/:id` - Update an existing product *[Admin Only]*.

### Cart & Checkout
- `POST /api/cart` - Add an item to the cart *[Auth Required]*.
- `GET /api/cart` - Retrieve current user's cart items and total cost *[Auth Required]*.
- `PUT /api/cart/:cart_item_id` - Update cart item quantity *[Auth Required]*.
- `DELETE /api/cart/:productId` - Remove item from cart *[Auth Required]*.
- `POST /api/cart/checkout` - Create an order, process checkout, and clear cart *[Auth Required]*.

### Orders
- `GET /api/orders` - Return order history to the logged-in user *[Auth Required]*.
- `GET /api/orders/:id` - Get specific order invoice *[Auth Required]*.
- `GET /api/orders/admin/all` - List every order platform-wide *[Admin Only]*.
- `PUT /api/orders/admin/:id` - Alter order shipping/delivery status *[Admin Only]*.

*(Additional settings and payment endpoints are managed via `settings.routes.js` and `payment.routes.js` respectively).*

## 🛠️ Local Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/) (LTS Version Recommended)
- [PostgreSQL](https://www.postgresql.org/) running locally to host the database.

### 1. Database Configuration
Ensure PostgreSQL is running. The backend is configured to automatically create tables (Products, Users, Cart, Orders, Settings) using the `create...Table()` functions mapped in `backend/src/app.js` upon starting the server. You only need to ensure the database specified in `.env` exists.

### 2. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory heavily referencing local vars:
   ```env
   PORT=3000
   DB_USER=postgres
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=miniecommerce
   JWT_SECRET=your_jwt_secret_signature
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server should automatically build database tables upon loading if they don't exist.*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend Vite development server:
   ```bash
   npm run dev
   ```

## ⚠️ Known Issues & Technical Debt

- **API Hardcoding:** The frontend app currently contains several hardcoded `/api/...` references mapped to `localhost:3000`. Ideally, these should be replaced with an environment variable referenced Axios instance (`import.meta.env.VITE_API_BASE_URL`).
- **Route Order (Shadowing):** In `backend/src/routes/order.routes.js`, the `GET /api/orders/:id` endpoint being placed before `GET /api/orders/admin/all` might inadvertently shadow the admin route.
- **Environment Secrets Leakage:** Ensure `.env` is explicitly added globally in `.gitignore` on both frontend and backend to avoid committing API keys/passwords.
