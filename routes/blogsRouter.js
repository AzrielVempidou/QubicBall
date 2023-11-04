const express = require(`express`)
const blogController = require("../controllers/blogsController")
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")
const blogRouter = express.Router()

blogRouter.get('/',blogController.getPostAll)
blogRouter.get('/:blogId',blogController.getPostById)
blogRouter.use(authentication)
blogRouter.post('/',blogController.createPost)
blogRouter.put('/:blogId',authorization,blogController.updatePost)


module.exports = blogRouter