'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {foreignKey: "userId"})
      Comment.belongsTo(models.Post, {foreignKey: "postId"})
    }
  }
  Comment.init({
    postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "postId fields are required. Please fill in all the fields.",
      },
      notEmpty: {
        msg: "postId fields are required. Please fill in all the fields.",
      },
    },
  },
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "userId fields are required. Please fill in all the fields.",
        },
        notEmpty: {
          msg: "userId fields are required. Please fill in all the fields.",
        },
      },
    },
    comment: {
    type:DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "comment fields are required. Please fill in all the fields.",
      },
      notEmpty: {
        msg: "comment fields are required. Please fill in all the fields.",
      },
    },
  }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};