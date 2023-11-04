const { Post, Comment } = require('../models')

const authorizationPost = async(req,res,next) => {
  try {
    const userId = +req.user.id
    const post = await Post.findByPk(req.params.blogId)

    if(!post) {
      throw { name: "Not Found", message: "Blog not found" }
    }

    if (post.userId !== userId ) {
      throw{ name: "Forbidden", message:"You are not authorized"}
    }
    next()
  } catch (error) {
    next(error)
  }
}
const authorizationComments = async(req,res,next) => {
  try {
    const userId = +req.user.id
    const comment = await Comment.findByPk(req.params.commentId)

    if(!comment) {
      throw { name: "Not Found", message: "Comment not found" }
    }

    if (comment.userId !== userId ) {
      throw{ name: "Forbidden", message:"You are not authorized"}
    }
    next()
  } catch (error) {
    next(error)
  }
}
module.exports = { 
  authorizationPost,
  authorizationComments
}
