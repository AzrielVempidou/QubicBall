const express = require(`express`)
const router = express.Router()

const userRouter = require('./userRouter')
const blogRouter = require('./blogsRouter')

router.use('/', userRouter)
router.use('/blogs', blogRouter )

module.exports = router