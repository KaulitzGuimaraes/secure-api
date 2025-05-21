require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST_NAME || 'public',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_PROD_NAME || 'public',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
};
