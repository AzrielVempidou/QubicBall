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
      console.log(error);
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

      if(!user){
        throw({
          name: "Unauthorized",
          message: "Invalid email or password"
        })
      }

      const isPassword = comparePass(password, user.password)

      if(!isPassword){
        throw({
          name: "Unauthorized",
          message: "Invalid email or password"
        })
      }
      const access_token = generateToken({
        email,
        id: Math.random(user.id)
      })

      res.status(200).json({
        response: {
          status: 200,
          message: "Login succesfully",
          access_token: access_token
        }

      })
    } catch (error) {
      console.log(error);
      next(error)
    }  
  }
}