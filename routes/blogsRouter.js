const express = require(`express`)
const blogController = require("../controllers/blogsController")
const blogRouter = express.Router()

blogRouter.get('/',blogController.getPostAll)
blogRouter.get('/:blogId',blogController.getPostById)

module.exports = blogRouter