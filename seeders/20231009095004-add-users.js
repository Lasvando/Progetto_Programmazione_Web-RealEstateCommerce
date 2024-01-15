'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('users', [
    {
      username: 'fsciarabba',
      email: 'sciarabbafederico@outlook.it',
      phone: '3342662919',
      password: 'k0aWXonkLVkFKIBqJsmlE92s74UugoAMect+SCB+ubM=',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'venditore',
      email: 'venditore@outlook.it',
      phone: '3342991919',
      password: 'k0aWXonkLVkFKIBqJsmlE92s74UugoAMect+SCB+ubM=',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', {[Op.or]: [{username: 'fsciarabba'}, {username: 'venditore'}]});
  }
};
