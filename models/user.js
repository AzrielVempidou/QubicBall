"use strict";
const { Model } = require("sequelize");
const { hashPass } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {foreignKey: "userId"})
      User.hasMany(models.Comment, {foreignKey: "userId"})
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "username fields are required. Please fill in all the fields.",
          },
          notEmpty: {
            msg: "username fields are required. Please fill in all the fields.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email is already in use. Please choose another email.",
        },
        validate: {
          isEmail: {
            msg: "Invalid email format. Please provide a valid email address.",
          },
          notNull: {
            msg: "email fields are required. Please fill in all the fields.",
          },
          notEmpty: {
            msg: "email field is required. Please fill in all the fields.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password fields are required. Please fill in all the fields.",
          },
          notEmpty: {
            msg: "password fields are required. Please fill in all the fields.",
          },
          len: {
            msg: "Minimum password length is 5",
            args: [5],
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user)=> {
          const newPassword = hashPass(user.password);
          user.password = newPassword
        }
      }
    }
  );
  return User;
};
