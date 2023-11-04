const { Post, User, Comment } = require('../models')
module.exports = class commentController{
  static async getAllCommentByPostId(req,res,next){
    try {
      const { postId } = req.params
      const comments = await Comment.findAll({
        where: {
          postId: postId
        },
        attributes: {exclude : ["updatedAt", "createdAt"]},
        include: [
          {
            model: User,
            attributes: ['username', 'email']
          },
          {
            model: Post,
            attributes: {exclude : ["updatedAt", "createdAt"]},
            include:{
              model: User,
              attributes: ['username', 'email'],
              
            }
          }
        ]
      })
      res.status(200).json({
        response:{
          status: 200,
          message: "Comments retrieved successfully",
          Comments: comments
        }
      })
    } catch (error) {
      next(error)
    }
  }
  static async createComment(req,res,next){
    try {
      const { postId } = req.params
      const comment = req.body
      comment.userId = req.user.id
      comment.postId = postId


      const createComment = await Comment.create(comment)

      const user = await User.findByPk(req.user.id);

      res.status(201).json({
        response:{
          status: 201,
          message: "Comment created successfully",
          comment: createComment.comment,
          user: user.username
        }
      })
    } catch (error) {
      next(error)
    }
  }
  static async updateComment(req,res,next){
    try {
      const { commentId } = req.params
      const comment = req.body

      const findCommentById = await Comment.findByPk(+commentId)

      if (!findCommentById) {
        throw { name: "Not Found", message: "Comment not found" }
      }

      const updateComment = await findCommentById.update(comment)
      res.status(200).json({
        response:{
          status: 200,
          message: "Comment updated successfully",
        }
      })
    } catch (error) {
      next(error)
    }
  }
  static async deleteComment(req,res,next){
    try {
      const { commentId } = req.params

      const findCommentById = await Comment.findByPk(+commentId)

      if (!findCommentById) {
        throw { name: "Not Found", message: "Comment not found" }
      }
      const deletePost = await findCommentById.destroy()
      res.status(200).json({
        response:{
          status: 200,
          message: "Comment has been deleted",
        }
      })
    } catch (error) {
      next(error)
    }
  }
}