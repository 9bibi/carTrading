# Car Trading System

## Project Overview
The Car Trading System is a web-based platform that facilitates the buying and selling of cars. It enables customers to browse available vehicles, make purchases, and track transactions while allowing dealerships to manage their inventory. The system provides authentication features and ensures secure transactions.

## Features
- User authentication and role management (customers, dealers)
- Car listing with details such as make, model, year, price, and mileage and more
- Customers can browse, purchase cars, and track their transactions
- Dealers can manage inventory and update car listings
- Secure transaction processing with various payment methods

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** bcrypt, JWT

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with credentials

### Customers
- `GET /api/customers/:id` - Retrieve customer details
- `PUT /api/customers/:id` - Update customer information
- `DELETE /api/customers/:id` - Remove customer account

### Cars
- `GET /api/cars` - List all available cars
- `GET /api/cars/:id` - Retrieve details of a specific car
- `POST /api/cars` - Add a new car (Dealer only)
- `PUT /api/cars/:id` - Update car details (Dealer only)
- `DELETE /api/cars/:id` - Remove a car listing (Dealer only)

### Dealerships
- `GET /api/dealerships` - List all dealerships
- `GET /api/dealerships/:id` - Retrieve details of a specific dealership
- `POST /api/dealerships` - Add a new dealership
- `PUT /api/dealerships/:id` - Update dealership details
- `DELETE /api/dealerships/:id` - Remove a dealership

### Transactions
- `GET /api/transactions` - List all transactions
- `GET /api/transactions/:id` - Retrieve details of a specific transaction
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/:id` - Update transaction details
- `DELETE /api/transactions/:id` - Cancel a transaction

## Installation and Setup

### Clone the repository:
```sh
git clone https://github.com/9bibi/carTrading.git
```

### Install dependencies:
```sh
cd carTrading
npm install
```

### Environment variables:
```
MONGO_URI=mongodb+srv://nygymettollaaibibi9:Kc1ocw29WAxROv47@cluster0.j4ydp.mongodb.net/carTrading
JWT_SECRET=4f7d8e2a1b3c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0
PORT=5000
```

### Start the server:
```sh
npm start
```

## Usage
- Use Postman or an API client to test endpoints.
- Dealers can manage their inventory via API requests.

## License
This project is open-source and available under the MIT License.
