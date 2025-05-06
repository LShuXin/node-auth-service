const { DataTypes } = require('sequelize');
const { mSequelize } = require('../../connection/MySqlDbConnection')

const User = mSequelize.define(
  'User',
  {
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  }, 
  {
    timestamps: true,
  }
);

module.exports = User;
