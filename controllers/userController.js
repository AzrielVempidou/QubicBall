const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
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
  static async login(req,res,next){
    try {
      const {email, password} = req.body

      const user = await User.findOne({
        where: {
          email
        }
      })

      if (!user || !comparePass(password, user.password)) {
        throw { name : "InvalidEmailPassword"}
       
      }
      const access_token = generateToken({
        id: user.id,
        random_id: Math.random(user.id),
        email,
        username: user.username
      })

      res.status(200).json({
        response: {
          status: 200,
          message: "Login succesfully",
          access_token: access_token
        }

      })
    } catch (error) {
      next(error)
    }  
  }
}