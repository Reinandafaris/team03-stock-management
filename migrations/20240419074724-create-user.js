'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
			id: {
				primaryKey: true,
				allowNull: false,
				type: Sequelize.STRING,
			},
			companyId: {
				type: Sequelize.STRING,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			role: {
				allowNull: false,
				type: Sequelize.ENUM('superadmin', 'admin', 'user'),
			},

			imageUrl: {
				type: Sequelize.ARRAY(Sequelize.TEXT),
			},
			imageId: {
				type: Sequelize.ARRAY(Sequelize.TEXT),
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
		await queryInterface.dropTable('Users');
	},
};
