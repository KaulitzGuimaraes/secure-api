const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config')['development'];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect
    }
);

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,   // This matches SERIAL behavior
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        }
    },
    {
        // Model options
        schema: 'users',         // Target specific Postgres schema
        tableName: 'Users',      // Exact table name (case-sensitive)
        freezeTableName: true,   // Prevent pluralization of table name
        timestamps: false,       // Disable Sequelize's createdAt & updatedAt
    }

);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = User; 