if (process.env.NODE_ENV !== "production") {
  require("dotenv").config() 
}


const express = require('express')
const router = require('./routes')
const errorHandler = require('./middleware/error_handle')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.use(router)
app.use(errorHandler)

module.exports = app
