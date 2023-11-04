'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      const posts = require("../Data/Posts.json");
      const comments = require("../Data/Comments.json");
      const users = require("../Data/Users.json");


     await queryInterface.bulkInsert('Users', users.map(user => {
      return {
        ...user,
        createdAt: new Date,
        updatedAt: new Date
      }
     }));

     await queryInterface.bulkInsert('Posts', posts.map(posts => {
      return {
        ...posts,
        createdAt: new Date,
        updatedAt: new Date
      }
     }));

     await queryInterface.bulkInsert('Comments', comments.map(comments => {
      return {
        ...comments,
        createdAt: new Date,
        updatedAt: new Date
      }
     }));
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});

    await queryInterface.bulkDelete('Posts', null, {});

    await queryInterface.bulkDelete('Comments', null, {});

  }
};
