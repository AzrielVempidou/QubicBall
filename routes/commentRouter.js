const express = require(`express`)
const commentController = require("../controllers/commentController")
const authentication = require("../middleware/authentication")
const commentRouter = express.Router()

commentRouter.get('/:postId', commentController.getAllCommentByPostId )
commentRouter.use(authentication)
commentRouter.post('/:postId', commentController.createComment )

module.exports = commentRouter
