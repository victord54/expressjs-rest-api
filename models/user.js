const { DataTypes } = require('sequelize');
const db = require('../db.config');

const User = db.define(
    'user',
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(50),
            validate: {
                isEmail: true,
            },
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        photoUrl: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    },
    {
        paranoid: true, // Soft delete
    },
);

module.exports = User;
