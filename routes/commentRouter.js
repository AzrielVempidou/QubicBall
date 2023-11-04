const express = require(`express`)
const commentController = require("../controllers/commentController")
const commentRouter = express.Router()

commentRouter.get('/:postId', commentController.getAllCommentByPostId )

module.exports = commentRouter
