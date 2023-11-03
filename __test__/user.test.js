const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models');
const { hashPass } = require('../helpers/bcrypt');

let access_token

beforeAll(async () => {
  try {
   const posts = require('../Data/Posts.json')
   const comments = require('../Data/Comments.json')
   await sequelize.queryInterface.bulkInsert("Customers", [{
     email: "test1@mail.com",
     password: hashPass('tests123'),
     createdAt: new Date(),
     updatedAt: new Date()
   }])
 
   await sequelize.queryInterface.bulkInsert('Posts', posts.map(posts => {
     return{
       ...posts,
       createdAt: new Date,
       updatedAt: new Date
     }
    }))
 
   await sequelize.queryInterface.bulkInsert('Comments', comments.map(comments => {
     return{
       ...comments,
       createdAt: new Date,
       updatedAt: new Date
     }
    }))
   
  } catch (error) {
   console.log(error);
  }
 })
 
 afterAll(async () => {
   await sequelize.queryInterface.bulkDelete("Customers", null, {
     restartIdentity: true,
     cascade: true,
     truncate: true
   })
   await sequelize.queryInterface.bulkDelete('Genres', null, {
     restartIdentity: true,
     cascade: true,
     truncate: true
   })
   await sequelize.queryInterface.bulkDelete('Movies', null, {
     restartIdentity: true,
     cascade: true,
     truncate: true
   })
 })
 
 describe('POST : /register', () => {
   test('sholud create a register succesfully and return 201', async () => {
     const body = {
      username: "user1",
      email: "test2@mail.com",
      password: "tests123"
       
     }
 
     const response = await request(app).post('/register').send(body)
 
     expect(response.statusCode).toBe(201)
     expect(response.body).toBeInstanceOf(Object)
     expect(response.body.response.status).toBe(201);
     expect(response.body.response.message).toBe("Register Created Succesfully");
   })
   
   test('should return 400  when username empty', async () => {
    const body = {
     username: "",
     email: "test1@mail.com",
     password: "tests123"
    }
    const response = await request(app).post('/register').send(body)
    
    expect(response.statusCode).toBe(400)
    // console.log(">>",response.body);
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty("msg", "email is required")

  })
   test('should return 400  when email empty', async () => {
     const body = {
      username: "user1",
      email: "",
      password: "tests123"
     }
     const response = await request(app).post('/register').send(body)
     
     expect(response.statusCode).toBe(400)
     // console.log(">>",response.body);
     expect(response.body).toBeInstanceOf(Object)
     expect(response.body).toHaveProperty("msg", "email fields are required. Please fill in all the fields.")
 
   })
   test('should return 400  when password empty', async () => {
     const body = {
      username: "user1",
      email: "test1@mail.com",
      password: ""
     }
     const response = await request(app).post('/register').send(body)
     
     expect(response.statusCode).toBe(400)
     expect(response.body).toBeInstanceOf(Object)
     expect(response.body).toHaveProperty("msg", "password fields are required. Please fill in all the fields.")
 
   })
   test('should return 400 when register using format email', async () =>{
     const body = {
       email: "test2mail.com",
       password: "tests123"
     }
 
     const response = await request(app).post('/register').send(body)
     expect(response.statusCode).toBe(400)
     expect(response.body).toHaveProperty("msg", "Invalid email format. Please provide a valid email address.")
   })
   test('should return 400 when register using existing email', async () => {
     const body = {
       email: "test1@mail.com",
       password: "tests123"
     }
     const response = await request(app).post('/register').send(body)
     
     expect(response.statusCode).toBe(400)
     expect(response.body).toBeInstanceOf(Object)
     expect(response.body).toHaveProperty("msg", "Email is already in use. Please choose another email.")
 
   })
 })