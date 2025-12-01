# Admin Dashboard

Admin panel for managing the E-commerce store.

## Setup & Run

1. **Install Dependencies:**
   ```bash
   cd Admin
   npm install
   ```

2. **Run Admin Panel:**
   ```bash
   npm run dev
   ```
   Admin panel will run on `http://localhost:5173`

## Features

- **Product Management**: Add, edit, delete products
- **Category Management**: Manage product categories
- **User Management**: View and manage users
- **Order Management**: View all orders

## Backend Connection

Admin panel is now connected to MongoDB backend API:
- Base URL: `http://localhost:5000/api`
- Proxy configured in `vite.config.js`
- API calls use JWT authentication

## Authentication

To use admin features, you need to:
1. Login as admin user (email: `admin@example.com`, password: `123456`)
2. Token will be stored in localStorage as `userInfo`
3. All API calls will include the token automatically

## API Endpoints Used

- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category
- `GET /api/users` - Get all users (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)
- `GET /api/orders` - Get all orders (Admin only)

## Notes

- Make sure backend is running on port 5000
- Admin user must be logged in to access admin routes
- Token is automatically included in API requests
