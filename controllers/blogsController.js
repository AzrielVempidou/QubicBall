const { Post } = require('../models')

module.exports = class blogController{
  static async getPostAll(req,res,next){
    try {
      const post = await Post.findAll()
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
}
