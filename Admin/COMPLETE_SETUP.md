# Complete Admin Panel Setup Guide

## ✅ Admin Panel Ab Complete Website Se Connected Hai!

### 🎯 Features Available:

1. **🔐 Authentication**
   - Login page with admin verification
   - Protected routes (only admin can access)
   - Auto-logout on token expiry
   - User info display in sidebar

2. **📊 Dashboard**
   - Real-time statistics from database:
     - Total Orders
     - Total Users
     - Total Revenue
     - Total Products
   - Recent orders list
   - Charts and visualizations

3. **🛍️ Product Management**
   - Add new products
   - Edit existing products
   - Delete products
   - Manage product images
   - Set featured products
   - Stock management
   - Price management (regular & compare at price)

4. **📁 Category Management**
   - Add categories
   - Edit categories
   - Delete categories
   - Assign products to categories
   - Category images

5. **👥 User Management**
   - View all users
   - Delete users
   - View user roles
   - User status (verified/unverified)

6. **📦 Order Management**
   - View all orders
   - Update order status (Pending, Processing, Shipped, Delivered, Cancelled)
   - View customer details
   - Order total and items
   - Order dates

## 🚀 How to Run:

### Step 1: Start Backend
```powershell
cd D:\E-commerce-Store-main\backend
npm run dev
```
Backend runs on: `http://localhost:5000`

### Step 2: Start Frontend (Customer Website)
```powershell
cd D:\E-commerce-Store-main\frontend
npm run dev
```
Frontend runs on: `http://localhost:3000`

### Step 3: Start Admin Panel
```powershell
cd D:\E-commerce-Store-main\Admin
npm run dev
```
Admin Panel runs on: `http://localhost:5173`

## 🔑 Admin Login:

- **URL**: `http://localhost:5173/login`
- **Email**: `admin@example.com`
- **Password**: `123456`

## 📋 Complete Management Features:

### Products:
- ✅ Create products with images, prices, descriptions
- ✅ Edit any product details
- ✅ Delete products
- ✅ Set featured products
- ✅ Manage stock levels
- ✅ Assign to categories

### Categories:
- ✅ Create categories with images
- ✅ Edit category details
- ✅ Delete categories
- ✅ Products automatically linked

### Orders:
- ✅ View all customer orders
- ✅ Update order status
- ✅ View customer information
- ✅ Track order totals
- ✅ Filter by status

### Users:
- ✅ View all registered users
- ✅ Delete users
- ✅ View user roles
- ✅ Check verification status

### Dashboard:
- ✅ Real-time statistics
- ✅ Revenue tracking
- ✅ Order analytics
- ✅ User count
- ✅ Product count

## 🔗 Database Connection:

- **MongoDB**: `localhost:27017`
- **Database**: `ecomstore` (or your configured name)
- **Collections**: `products`, `users`, `orders`, `categories`, `carts`

## ⚠️ Important Notes:

1. **Authentication Required**: Admin panel requires login
2. **Admin Role Only**: Only users with `role: 'admin'` can access
3. **Token Storage**: Token stored in `localStorage` as `userInfo`
4. **Auto Refresh**: Dashboard has refresh button to update stats
5. **Real-time Updates**: All changes reflect immediately in database

## 🎨 Admin Panel Features:

- Dark/Light mode toggle
- Responsive design
- Material-UI components
- Beautiful charts and graphs
- Real-time data from MongoDB
- Complete CRUD operations

## 📝 API Endpoints Used:

### Products:
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories:
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Users:
- `GET /api/users` - Get all users (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Orders:
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)
- `PUT /api/orders/:id/deliver` - Mark as delivered (Admin only)

## ✅ Everything is Connected:

- ✅ Admin Panel ↔️ Backend API
- ✅ Backend API ↔️ MongoDB Database
- ✅ Frontend Website ↔️ Backend API
- ✅ All data synced in real-time
- ✅ Complete management capabilities

Ab aap admin panel se apni complete website manage kar sakte hain! 🎉

