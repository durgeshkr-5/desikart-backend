# DesiKart - Role-Based API Backend

**Concise Description:**  
DesiKart is the backend for an e-commerce platform, built with Node.js and Express. It features secure, role-based access for admins, vendors, and users, with modular API endpoints and JWT authentication.

---

This repository contains a Node.js backend built with Express, implementing a role-based API architecture for an application with **admin**, **vendor**, **user**, and **public** routes. It uses MongoDB for data storage, JWT authentication, and authorization middleware for secure access control.

## Features

- **Role-Based Access Control**: Supports `admin`, `vendor`, and `user` roles with protected route groups.
- **JWT Authentication**: Secure login and access using JSON Web Tokens.
- **MongoDB Integration**: Connection management via a configuration file.
- **CORS Support**: Configurable cross-origin resource sharing.
- **Environment Variables**: Uses `.env` for sensitive configurations.
- **API Routing**: Modular routes for authentication, admin, vendor, user, and public access.
- **Error Handling**: Returns 404 for undefined routes.

## Project Structure

```
.
├── config/
│   └── mongoDB.config.js
├── middlewares/
│   ├── authMiddlewares.js
│   └── rolesMiddleware.js
├── routes/
│   ├── admin.routes.js
│   ├── auth.routes.js
│   ├── public.routes.js
│   ├── user.routes.js
│   └── vendor.routes.js
├── .env
├── index.js (or app.js)
└── package.json
```

## API Endpoints

| Route Prefix      | Role Protected | Description           |
|-------------------|---------------|-----------------------|
| `/api/public`     | No            | Public endpoints      |
| `/api/auth`       | No            | Authentication APIs   |
| `/api/admin`      | Admin         | Admin functionalities |
| `/api/vendor`     | Vendor        | Vendor functionalities|
| `/api/user`       | User          | User functionalities  |

## Getting Started

### Prerequisites

- Node.js >= 14.x
- MongoDB database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file:

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/your-db
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the application**
   ```bash
   npm start
   ```
   The server will start at the port defined in your `.env` file.

## Usage

- Access public routes: `GET /api/public/...`
- Authenticate: `POST /api/auth/login`
- Access protected routes by providing JWT in `Authorization` header.

## Middleware

- **authMiddleware**: Validates JWT tokens.
- **rolesMiddleware**: Restricts access based on user role.

## Error Handling

Any undefined route returns:
```json
{ "msg": "No Routes Found!!!" }
```
