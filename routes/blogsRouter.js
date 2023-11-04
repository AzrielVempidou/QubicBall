const express = require(`express`)
const blogController = require("../controllers/blogsController")
const blogRouter = express.Router()

blogRouter.get('/',blogController.getPostAll)

module.exports = blogRouter