'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Items', {
			id: {
				primaryKey: true,
				allowNull: false,
				type: Sequelize.STRING,
			},
			categoryId: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			imageUrl: {
				type: Sequelize.Sequelize.ARRAY(Sequelize.TEXT),
			},
			imageId: {
				type: Sequelize.Sequelize.ARRAY(Sequelize.TEXT),
			},
			stock: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			price: {
				allowNull: false,
				type: Sequelize.FLOAT,
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
