const { Post, User } = require('../models')

module.exports = class blogController{
  static async getPostAll(req,res,next){
    try {
      const post = await Post.findAll({
        include: [
          {
            model: User,
            attributes: [ 'username', 'email']
          }
        ]
      })
      res.status(200).json({
        response:{
          status: 200,
          message: "Blog retrieved successfully",
          Posts: post
        }
      })
    } catch (error) {
      console.log(error, "error controllers");
      next(error)
    }
  }
  static async getPostById(req,res,next){
    try {
      const { blogId } = req.params

      const post = await Post.findOne({
        where: {
          id: blogId
        },
        include: [
          {
            model: User,
            attributes: ['username', 'email']
          }
        ]
      });

      if(!post){
        throw { name: "Not Found", message: "Blog not found" }
      }

      res.status(200).json({
        response:{
          status: 200,
          message: "Blog retrieved successfully",
          Posts: post
        }
      })
    } catch (error) {
      console.log(error.message, "<<");
      next(error)
    }
  }
  static async createPost(req,res,next){
    try {
      const post = req.body
      post.userId = req.user.id
      const createPost = await Post.create(post)
      res.status(201).json({
        response:{
          status: 201,
          message: "Blog created successfully",
          blog: createPost
        }
      })
    } catch (error) {
      console.log(error, '<<');
      next(error)
    }
  }
}
