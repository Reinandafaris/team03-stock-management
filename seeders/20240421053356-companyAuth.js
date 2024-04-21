'use strict';
const { randomUUID } = require('crypto');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		//! COMPANIES
		const companyData = [];

		for (let i = 1; i <= 3; i++) {
			companyData.push({
				id: randomUUID(),
				name: `PT.0${i} Tbk.`,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		const companies = await queryInterface.bulkInsert('Companies', companyData, {
			returning: true,
		});

		//! USER & AUTH

		const password = 'password';
		const confirmPassword = password;

		const saltRounds = 10;
		const hashedPassword = bcrypt.hashSync(password, saltRounds);
		const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

		const roles = ['superadmin', 'admin', 'member'];

		let users_data;
		companies.map((company) => {
			const users = roles.map((role) => ({
				id: randomUUID(),
				companyId: role === 'superadmin' ? null : company.id,
				name: `si ${role}`,
				role: role,
				imageUrl: '{}',
				imageId: '{}',
				createdAt: new Date(),
				updatedAt: new Date(),
			}));

			return (users_data = users);
		});

		const users = await queryInterface.bulkInsert('Users', users_data, {
			returning: true,
		});

		const auth_data = users.map((user) => {
			return {
				id: randomUUID(),
				userId: user.id,
				email: `${user.role}@mail.com`,
				password: hashedPassword,
				confirmPassword: hashedConfirmPassword,
				createdAt: new Date(),
				updatedAt: new Date(),
			};
		});

		return queryInterface.bulkInsert('Auths', auth_data);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Companies', null, { returning: true });
		await queryInterface.bulkDelete('Users', null, { returning: true });
		await queryInterface.bulkDelete('Auths', null, { returning: true });
	},
};
