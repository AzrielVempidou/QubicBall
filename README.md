# QubicBall

Qubicball is a Node.js application built with Express.js and Sequelize ORM. This project provides a foundation for creating a web server with authentication, using technologies like JSON Web Tokens (JWT) and bcrypt for password hashing. It also includes database migrations and seeding functionality using Sequelize.

Prerequisites
Before you begin, ensure you have the following installed on your machine:

Node.js: Download and install Node.js
MySQL or PostgreSQL: Make sure you have a running instance of MySQL or PostgreSQL database server.

Available Scripts
-npm test: Run tests using Jest.
-npm start: Start the production server.
-npm run dev: Start the development server with nodemon for automatic restarts during development.
-npm run db: Create database, run migrations, and seed data.

API Endpoints
- `POST /register`
- `POST /login`
- `GET /blogs`
- `GET /blogs/:blogId`
- `GET /comments/:postId`

Routes below need authentication:

- `POST /blogs`
- `POST /comments/:postId`

Routes below need authentication & authorization:

- `PUT /blogs/:blogId`
- `DELETE /blogs/:blogId`
- `PUT /comments/:commentId`
- `DELETE /comments/:commentId`
