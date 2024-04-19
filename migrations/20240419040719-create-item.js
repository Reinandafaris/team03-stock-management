'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Items', {
			id: {
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
			},
			categoryId: { type: Sequelize.INTEGER, allowNull: false },
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			imageUrl: {
				type: Sequelize.Sequelize.ARRAY(Sequelize.TEXT),
			},
			imageId: {
				type: Sequelize.Sequelize.ARRAY(Sequelize.TEXT),
			},
			stock: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			price: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Items');
	},
};
