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
}