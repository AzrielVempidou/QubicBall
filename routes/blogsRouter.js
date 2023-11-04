const express = require(`express`)
const blogController = require("../controllers/blogsController")
const authentication = require("../middleware/authentication")
const blogRouter = express.Router()

blogRouter.get('/',blogController.getPostAll)
blogRouter.get('/:blogId',blogController.getPostById)
blogRouter.use(authentication)
blogRouter.post('/',blogController.createPost)


module.exports = blogRouter