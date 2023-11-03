const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hashPass } = require("../helpers/bcrypt");

let access_token;

beforeAll(async () => {
  try {
    const posts = require("../Data/Posts.json");
    const comments = require("../Data/Comments.json");
    
    await sequelize.queryInterface.bulkInsert("Users", [
      {
        email: "test1@mail.com",
        password: hashPass("tests123"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await sequelize.queryInterface.bulkInsert(
      "Posts",
      posts.map((posts) => {
        return {
          ...posts,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );

    await request(app)
    .post("/login")
    .send({
      email: "example@example.com", 
      password: "password123",      
    });
    access_token = response.body.response.access_token;
  
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
  await sequelize.queryInterface.bulkDelete("Posts", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});

describe("GET : /blogs", () => {
  test("should respond with 200 and list of blogs when valid access token is provided", async () => {

    const response = await request(app)
      .get("/blogs")
      .set("access_token", access_token)

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.response.status).toBe(200);
      expect(response.body.response.message).toBe("Blogs retrieved successfully");
      expect(Array.isArray(response.body.response.blogs)).toBe(true);
  })

  test("should respond with 401 when access token is missing", async () =>{
    const response = await request(app).get("/blogs");
    expect(response.status).toBe(401);
    expect(response.body.response.status).toBe(401);
    expect(response.body.response.message).toBe("Unauthorized: Access token is required");
  })
})
