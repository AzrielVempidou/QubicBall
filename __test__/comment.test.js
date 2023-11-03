const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hashPass } = require("../helpers/bcrypt");

let access_token;

beforeAll(async () => {
  try {
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
      "Comments",
      comments.map((comments) => {
        return {
          ...comments,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );

    const response = await request(app)
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
  await sequelize.queryInterface.bulkDelete("Comments", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});

describe("Comment Routes Test", () => {
  describe("GET /comments/:postId", () => {
    test("should respond with 200 and list of comments for the specified blog post when valid access token and postId are provided", async () => {
        const postId = 1
        const response = await request(app)
          .get(`/comments/${postId}`)
          .set("access_token", access_token);
  
        expect(response.status).toBe(200);
        expect(response.body.response.status).toBe(200);
        expect(response.body.response.message).toBe("Comments retrieved successfully");
        expect(response.body.response.comments).toBeDefined();
      

    });
    
    test("should respond with 404 when specified postId does not exist", async () => {

        const nonExistentPostId = 9999; 
  
        const response = await request(app)
          .get(`/comments/${nonExistentPostId}`)
          .set("access_token", access_token);
  
        expect(response.status).toBe(404);
        expect(response.body.status).toBe(404);
        expect(response.body.message).toBe("Comment not found");

    });

    test("should respond with 400 and appropriate error message when access token is missing", async () => {
        const postId = 1
        const response = await request(app).get(`/comments/${postId}`);
  
        expect(response.status).toBe(400);
        expect(response.body.status).toBe(400);
        expect(response.body.message).toBe("Unauthorized: Access token is required");

    });

  })

  describe("POST /comments/:postId", () => {
    test("should respond with 201 and the created comment when valid access token and valid comment data are provided", async () => {
        const postId = 1
        const commentData = {
          postId: postId,
          comment: "Sample comment",
        };
  
        const response = await request(app)
          .post(`/comments/${postId}`)
          .set("access_token", access_token)
          .send(commentData);
  
        expect(response.status).toBe(201);
        expect(response.body.response.status).toBe(201);
        expect(response.body.response.message).toBe("Comment added successfully");
        expect(response.body.response.comment).toBeDefined();
        expect(response.body.response.comment.postId).toBe(commentData.postId);
        expect(response.body.response.comment.comment).toBe(commentData.comment);
    });
  
    test("should respond with 400 and appropriate error message when access token is missing", async () => {
        const postId = 1

        const commentData = {
          postId: postId,
          comment: "Sample comment",
        };
  
        const response = await request(app)
          .post(`/comments/${postId}`)
          .send(commentData);
  
        expect(response.status).toBe(400);
        expect(response.body.status).toBe(400);
        expect(response.body.message).toBe("Unauthorized: Access token is required");
    });
  
    test("should respond with 400 and appropriate error message when postId field is missing", async () => {
        const postId = 1

        const commentData = {
          comment: "Sample comment",
        };
  
        const response = await request(app)
          .post(`/comments/${postId}`)
          .set("access_token", access_token)
          .send(commentData);
  
        expect(response.status).toBe(400);
        expect(response.body.status).toBe(400);
        expect(response.body.message).toBe("postId fields are required. Please fill in all the fields.");

    });
  
    test("should respond with 400 and appropriate error message when comment field is missing", async () => {
        const postId = 1

        const commentData = {
          postId: postId,
        };
  
        const response = await request(app)
          .post(`/comments/${postId}`)
          .set("access_token", access_token)
          .send(commentData);
  
        expect(response.status).toBe(400);
        expect(response.body.status).toBe(400);
        expect(response.body.message).toBe("comment fields are required. Please fill in all the fields.");

    });
  })

  describe("PUT /comments/:commentId", () => {
    test("should respond with 200 and success message when valid access token, blogId, and updated comment data are provided", async () => {
  
        const updatedCommentData = {
          comment: "Updated sample comment",
        };
        const commentId = 1
        const response = await request(app)
          .put(`/comments/${commentId}`)
          .set("access_token", access_token)
          .send(updatedCommentData);
  
        expect(response.status).toBe(200);
        expect(response.body.response.status).toBe(200);
        expect(response.body.response.message).toBe("Comment updated successfully");

    });
  
    test("should respond with 400 and appropriate error message when access token is missing", async () => {

        const updatedCommentData = {
          comment: "Updated sample comment",
        };
        
        const commentId = 1

        const response = await request(app)
          .put(`/comments/${commentId}`)
          .send(updatedCommentData);
  
        expect(response.status).toBe(400);
        expect(response.body.status).toBe(400);
        expect(response.body.message).toBe("Unauthorized: Access token is required");
 
    });
  
    test("should respond with 404 and appropriate error message when commentId is invalid", async () => {

        const updatedCommentData = {
          comment: "Updated sample comment",
        };
        const nonExistentPostId = 9999; 
        const response = await request(app)
          .put(`/comments/${nonExistentPostId}`) // Gunakan ID yang tidak ada di database
          .set("access_token", access_token)
          .send(updatedCommentData);
  
        expect(response.status).toBe(404);
        expect(response.body.status).toBe(404);
        expect(response.body.message).toBe("Comment not found");

    });
  });
})
