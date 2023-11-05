'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {foreignKey: "userId"})
      Post.hasMany(models.Comment, {foreignKey: "postId"})

    }
  }
  Post.init({
    title: {
    type:DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "title fields are required. Please fill in all the fields.",
      },
      notEmpty: {
        msg: "title fields are required. Please fill in all the fields.",
      },
    },
  },
    body: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "body fields are required. Please fill in all the fields.",
      },
      notEmpty: {
        msg: "body fields are required. Please fill in all the fields.",
      },
    },
  },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "UserId fields are required. Please fill in all the fields.",
        },
        notEmpty: {
          msg: "UserId fields are required. Please fill in all the fields.",
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};