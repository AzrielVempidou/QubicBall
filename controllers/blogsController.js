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
      next(error)
    }
  }
  static async updatePost(req,res,next){
    try {
      const { blogId } = req.params
      const post = req.body
  
      const findPostById = await Post.findByPk(+blogId)

      if (!findPostById) {
        throw { name: "Not Found", message: "Blog not found" }
      }

      const updatePost = await findPostById.update(post)

      res.status(200).json({
        response:{
          status: 200,
          message: "Blog updated successfully",
        }
      })

    } catch (error) {
      next(error)
    }
  }
  static async deletePost(req,res,next){
    try {
      const { blogId } = req.params
      const findPostById = await Post.findByPk(+blogId)

      if (!findPostById) {
        throw { name: "Not Found", message: "Blog not found" }
      }

      const deletePost = await findPostById.destroy()
      
      res.status(200).json({
        response:{
          status: 200,
          message: "Blog has been deleted",
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
