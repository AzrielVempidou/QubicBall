const express = require(`express`)
const blogController = require("../controllers/blogsController")
const authentication = require("../middleware/authentication")
const { authorizationPost } = require("../middleware/authorization")
const blogRouter = express.Router()

blogRouter.get('/',blogController.getPostAll)
blogRouter.get('/:blogId',blogController.getPostById)
blogRouter.use(authentication)
blogRouter.post('/',blogController.createPost)
blogRouter.put('/:blogId',authorizationPost,blogController.updatePost)
blogRouter.delete('/:blogId',authorizationPost,blogController.deletePost)


module.exports = blogRouter