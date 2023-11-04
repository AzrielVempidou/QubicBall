const express = require(`express`)
const router = express.Router()

const userRouter = require('./userRouter')
const blogRouter = require('./blogsRouter')
const commentRouter = require('./commentRouter')

router.use('/', userRouter)
router.use('/blogs', blogRouter )
router.use('/comments', commentRouter )
module.exports = router