"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Vehicles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      model: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      manufacturer: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cost_in_credits: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      length: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      max_atmosphering_speed: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      crew: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      passengers: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cargo_capacity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      consumables: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vehicle_class: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pilots: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      films: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      created: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      edited: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Vehicles");
  },
};
