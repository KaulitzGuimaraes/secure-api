# Secure API with Authentication and AWS Kinesis Integration

This project is a simple, secure RESTful API built using Node.js, Express, Sequelize, and PostgreSQL. It provides basic user authentication functionality using JWT and logs user actions (signup/login) to an AWS Kinesis Data Stream for observability and integration with monitoring/analytics systems.

## Features

* User registration
* User login with JWT token generation
* Password hashing with bcrypt
* Logs sent to AWS Kinesis Data Streams
* Environment variable support with dotenv
* Sequelize ORM with PostgreSQL
* Clean project structure with modular code

## Prerequisites

* Node.js (v18 or later)
* PostgreSQL installed and running
* An AWS account with permissions to use IAM and Kinesis

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
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_HOST=127.0.0.1
DB_DIALECT=postgres
JWT_SECRET=yourSuperSecretKey
AWS_REGION=your-aws-region
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
KINESIS_STREAM_NAME=your-stream-name
```

4. Run the development server:

```bash
npm run dev
```

## AWS Setup Instructions

### 1. Create a Kinesis Data Stream

* Go to AWS Console → Kinesis → Data Streams
* Click "Create data stream"
* Give it a name (e.g., `auth-log-stream`) and specify the number of shards (1 is enough for basic usage)
* Click "Create stream"

### 2. Create an IAM User

* Go to AWS Console → IAM → Users → Add user
* Choose a username (e.g., `kinesis-logger`)
* Select "Access key - Programmatic access"
* Attach policies directly: select `AmazonKinesisFullAccess`
* Complete the user creation and save the access key ID and secret access key

### 3. Assign Permissions via Inline Policy (Optional More Restrictive Access)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "kinesis:PutRecord",
      "Resource": "arn:aws:kinesis:your-region:your-account-id:stream/your-stream-name"
    }
  ]
}
```

### 4. Set Environment Variables

Add the IAM credentials and stream information to your `.env` file:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
KINESIS_STREAM_NAME=auth-log-stream
```

## API Overview

### Signup Endpoint

`POST /signup`

* Creates a new user
* Logs the signup attempt and result to Kinesis

### Login Endpoint

`POST /login`

* Authenticates the user and returns a JWT token
* Logs the login attempt and result to Kinesis

Logs contain:

```json
{
  "email": "user@example.com",
  "action": "LOGIN_SUCCESS" | "LOGIN_FAIL" | "SIGNUP_SUCCESS" | "SIGNUP_FAIL",
  "timestamp": "ISO timestamp",
  "error": "optional error string"
}
```

## Scripts

* `npm run dev` – starts the server with nodemon for development

## Folder Structure

```
secure-api/
├── config/
│   └── config.json
├── models/
│   └── user.js
├── routes/
│   └── auth.js
├── controllers/
│   └── authController.js
│   └── producerController.js
├── .env
├── index.js
├── package.json
└── README.md
```

---

Now your API not only authenticates users securely but also logs useful events to AWS Kinesis for further processing, monitoring, or analysis.
