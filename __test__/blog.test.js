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

    await request(app).post("/login").send({
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

describe("GET : /blogs", async () => {
  test("should respond with 200 and list of blogs when valid access token is provided", async () => {
    const response = await request(app)
      .get("/blogs")
      .set("access_token", access_token);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.response.status).toBe(200);
    expect(response.body.response.message).toBe("Blogs retrieved successfully");
    expect(Array.isArray(response.body.response.blogs)).toBe(true);
  });

  test("should respond with 401 when access token is missing", async () => {
    const response = await request(app).get("/blogs");
    expect(response.status).toBe(401);
    expect(response.body.response.status).toBe(401);
    expect(response.body.response.message).toBe(
      "Unauthorized: Access token is required"
    );
  });
});

describe("GET /blogs/:blogId", async () => {
  test("should respond with 200 and details of the specified blog when valid access token and blogId are provided", async () => {
    const blogId = 1;
    const response = await request(app)
      .get(`/blogs/${blogId}`)
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body.response.status).toBe(200);
    expect(response.body.response.message).toBe("Blog retrieved successfully");
    expect(Array.isArray(response.body.response.blogs)).toBe(true);
    expect(response.body.response.blog.id).toBe(blogId);
  });

  test("should respond with 404 when specified blogId is not found", async () => {
    try {
      const nonExistentBlogId = 9999; // ID yang tidak ada dalam database
      const response = await request(app)
        .get(`/blogs/${nonExistentBlogId}`)
        .set("access_token", access_token);

      expect(response.status).toBe(404);
      expect(response.body.status).toBe(404);
      expect(response.body.message).toBe("Blog not found");
    } catch (error) {
      throw error;
    }
  });

  test("should respond with 404 when specified blogId is not found", async () => {
    const nonExistentBlogId = 9999; // ID yang tidak ada dalam database
    const response = await request(app)
      .get(`/blogs/${nonExistentBlogId}`)
      .set("access_token", access_token);

    expect(response.status).toBe(404);
    expect(response.body.status).toBe(404);
    expect(response.body.message).toBe("Blog not found");
  });

  test("should respond with 401 when access token is missing", async () => {
    
      const blogId = 1;
      const response = await request(app).get(`/blogs/${blogId}`);
      expect(response.status).toBe(401);
      expect(response.body.response.status).toBe(401);
      expect(response.body.response.message).toBe("Unauthorized: Access token is required");
  });

});
