# Secure API with Authentication

This project is a simple, secure RESTful API built using Node.js, Express, Sequelize, and PostgreSQL. It provides basic user authentication functionality using JWT.

## Features

- User registration
- User login with JWT token generation
- Password hashing with bcrypt
- Environment variable support with dotenv
- Sequelize ORM with PostgreSQL
- Clean project structure with modular code

## Prerequisites

- Node.js (v18 or later)
- PostgreSQL installed and running

## Installation

1. Clone the repository:

```bash
git clone https://github.com/KaulitzGuimaraes/secure-api.git
cd secure-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add:

```env
JWT_SECRET=yourSuperSecretKey
```

4. Update your `.env` file with your database credentials.

Example `.env` file:

```env
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_HOST=127.0.0.1
DB_DIALECT=postgres
JWT_SECRET=yourSuperSecretKey
```

5. Run the development server:

```bash
npm run dev
```

## Scripts

- `npm run dev` – starts the server with nodemon for development

## Folder Structure

```
secure-api/
├── config/
│   └── config.json
├── models/
│   └── user.js
├── routes/
│   └── auth.js
├── .env
├── index.js
├── package.json
└── README.md
```
