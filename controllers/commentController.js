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
      console.log(error, "<<<");
      next(error)
    }
  }

}