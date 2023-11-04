const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async(req,res,next) => {
  // console.log(">>", req.headers.access_token);

  try {
    const { access_token } = req.headers
    

    if (!access_token) {
      throw { name: "Unauthorized", message: "Invalid Token"}
    }

    const data = verifyToken(access_token)

    const user = await User.findByPk(data.id)
    if (!user) {
      throw { name: "Unauthorized", message: "Unauthorized: Access token is required"}
    }
    req.user = {
      id: user.id,
      email: user.email,

    }
    next()
    
  } catch (error) {
    console.log(error, "<<");
    next(error)
  }
}

module.exports = authentication