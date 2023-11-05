const express = require(`express`)
const commentController = require("../controllers/commentController")
const authentication = require("../middleware/authentication")
const { authorizationComments } = require("../middleware/authorization")
const commentRouter = express.Router()

commentRouter.get('/:postId', commentController.getAllCommentByPostId )
commentRouter.use(authentication)
commentRouter.post('/:postId', commentController.createComment )
commentRouter.put('/:commentId', authorizationComments, commentController.updateComment )
commentRouter.delete('/:commentId', authorizationComments, commentController.deleteComment )

module.exports = commentRouter
