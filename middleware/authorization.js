const { Post } = require('../models')

const authorization = async(req,res,next) => {
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
    console.log(error, "<<");
    next(error)
  }
}

module.exports = authorization
