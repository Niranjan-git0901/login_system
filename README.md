# Login System API

A simple authentication system built using Node.js, Express.js, MongoDB, JWT, and bcrypt.

## Features

* User Signup
* User Login
* Password Hashing with bcrypt
* JWT Authentication
* Protected Routes
* User Profile Route
* Input Validation
* Logout Functionality
* Simple Frontend using HTML, CSS, and JavaScript

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JSON Web Token (JWT)
* bcrypt

### Frontend

* HTML
* CSS
* JavaScript

## Project Structure

```text
login-project/
│
├── models/
│   └── user.js
│
├── routes/
│   └── authRoutes.js
│
├── middleware/
│   └── jwtauth.js
│
├── public/
│   ├── signup.html
│   ├── login.html
│   ├── dashboard.html
│   └── style.css
│
├── .env
├── server.js
├── package.json
└── README.md
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project directory:

```bash
cd login-project
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the server:

```bash
node server.js
```

Server runs on:

```text
http://localhost:3000
```

## API Endpoints

### Signup

```http
POST /signup
```

Request Body:

```json
{
  "name": "Niranjan",
  "email": "niranjan@gmail.com",
  "password": "123456"
}
```

### Login

```http
POST /login
```

Request Body:

```json
{
  "email": "niranjan@gmail.com",
  "password": "123456"
}
```

Response:

```json
{
  "message": "Login Success",
  "token": "JWT_TOKEN"
}
```

### Dashboard (Protected Route)

```http
GET /dashboard
```

Header:

```http
Authorization: Bearer JWT_TOKEN
```

### Profile (Protected Route)

```http
GET /profile
```

Header:

```http
Authorization: Bearer JWT_TOKEN
```

## Authentication Flow

```text
Signup
   ↓
Store User in MongoDB
   ↓
Login
   ↓
Generate JWT
   ↓
Store Token in Browser
   ↓
Access Protected Routes
```

## Learning Outcomes

Through this project, I learned:

* Express Routing
* MongoDB Integration
* Password Hashing
* JWT Authentication
* Middleware
* REST APIs
* Git and GitHub Workflow

## Author

Niranjan
Computer Science Student
Aspiring Backend Developer
