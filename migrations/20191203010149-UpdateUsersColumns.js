'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'profilePicture',
         Sequelize.STRING
       ),
      queryInterface.addColumn(
        'Users',
        'displayName',
        Sequelize.STRING
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Users',
        'profilePicture',
         Sequelize.STRING
       ),
      queryInterface.removeColumn(
        'Users',
        'displayName',
        Sequelize.STRING
      )
    ]);
  }
};
