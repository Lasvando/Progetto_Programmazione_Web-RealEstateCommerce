'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('roles', [
    {
      name: 'Acquirente',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Venditore',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('roles', {[Op.or]: [{name: 'Acquirente'}, {name: 'Venditore'}]});
  }
};
