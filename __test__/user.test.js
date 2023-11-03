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
  await sequelize.queryInterface.bulkDelete("Comments", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});

describe("POST : /register", () => {
  test("sholud create a register succesfully and return 201", async () => {
    const body = {
      username: "user1",
      email: "test2@mail.com",
      password: "tests123",
    };

    const response = await request(app).post("/register").send(body);

    expect(response.statusCode).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.response.status).toBe(201);
    expect(response.body.response.message).toBe("Register Created Succesfully");
  });

  test("should return 400  when username empty", async () => {
    const body = {
      username: "",
      email: "test1@mail.com",
      password: "tests123",
    };
    const response = await request(app).post("/register").send(body);

    expect(response.statusCode).toBe(400);
    // console.log(">>",response.body);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.status).toBe(400);
    expect(response.body.message).toBe(
      "username fields are required. Please fill in all the fields."
    );
  });
  test("should return 400  when email empty", async () => {
    const body = {
      username: "user1",
      email: "",
      password: "tests123",
    };
    const response = await request(app).post("/register").send(body);

    expect(response.statusCode).toBe(400);
    // console.log(">>",response.body);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.status).toBe(400);
    expect(response.body.message).toBe(
      "email fields are required. Please fill in all the fields."
    );
  });
  test("should return 400  when password empty", async () => {
    const body = {
      username: "user1",
      email: "test1@mail.com",
      password: "",
    };
    const response = await request(app).post("/register").send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.status).toBe(400);
    expect(response.body.message).toBe(
      "password fields are required. Please fill in all the fields."
    );
  });
  test("should return 400 when register using format email", async () => {
    const body = {
      email: "test2mail.com",
      password: "tests123",
    };

    const response = await request(app).post("/register").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe(400);
    expect(response.body.message).toBe(
      "Invalid email format. Please provide a valid email address."
    );
  });
  test("should return 400 when register using existing email", async () => {
    const body = {
      email: "test1@mail.com",
      password: "tests123",
    };
    const response = await request(app).post("/register").send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.status).toBe(400);
    expect(response.body.message).toBe(
      "Email is already in use. Please choose another email."
    );
  });
});

describe("POST : /login", () => {
  test("sholud create a login succesfully and return 200", async () => {
    const body = {
      email: "test2@mail.com",
      password: "tests123",
    };

    const response = await request(app).post("/login").send(body);
    access_token = response.body.access_token;
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.response.status).toBe(200);
    expect(response.body.response.message).toBe("Login successfully");
    expect(response.body.response).toHaveProperty(
      "access_token",
      expect.any(String)
    );
  });

  test("should return 400  when email empty", async () => {
    const body = {
      email: "",
      password: "tests123",
    };
    const response = await request(app).post("/login").send(body);

    expect(response.statusCode).toBe(400);
    // console.log(">>",response.body);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.status).toBe(400);
    expect(response.body.message).toBe("Email/Password  is required");
  });
  test("should return 400  when password empty", async () => {
    const body = {
      email: "test1@mail.com",
      password: "",
    };
    const response = await request(app).post("/login").send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.status).toBe(400);
    expect(response.body.message).toBe("Email/Password  is required");
  });
  test("sholud return 401 when email unregister", async () => {
    const body = {
      email: "test23@mail.com",
      password: "tests12345",
    };

    const response = await request(app).post("/login").send(body);
    access_token = response.body.access_token;
    expect(response.statusCode).toBe(401);
    expect(response.body.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized: Email not registered");
  });
});
