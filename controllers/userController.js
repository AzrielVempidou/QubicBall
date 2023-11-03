const { User } = require('../models')

module.exports = class UserController {
  static async register(req,res,next){
    try {
      const {
        username,
        email,
        password
      } = req.body

      const user = await User.create({
        username,
        email,
        password
      })

      res.status(201).json({
        response: {
          status: 201,
          message: "Register Created Successfully"
        }
      })

    } catch (error) {
      next(error)
    }
  }
}