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

		const usersAuth = await queryInterface.bulkInsert('Auths', auth_data, {
			returning: true,
		});

		//! CATEGORY ITEMS
		const categoryItems = [];

		for (let i = 1; i <= 3; i++) {
			categoryItems.push({
				id: randomUUID(),
				name: `category 0${i}`,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		const categories = await queryInterface.bulkInsert('CategoryItems', categoryItems, {
			returning: true,
		});

		//! ITEMS
		let categoryId = categories.map((category) => {
			return category.id;
		});

		let items_data = [];

		for (let i = 0; i < 100; i++) {
			items_data.push({
				id: randomUUID(),
				categoryId: categoryId[Math.floor(Math.random() * categoryId.length)],
				name: `item ${i}`,
				imageUrl: '{}',
				imageId: '{}',
				stock: 10,
				price: `${i + 1}000`,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		const items = await queryInterface.bulkInsert('Items', items_data, {
			returning: true,
		});

		//! STOCKS
		let stocks_data = [];
		let companiesId = companies.map((company) => {
			return company.id;
		});

		let itemsId = items.map((item) => {
			return item.id;
		});

		for (let i = 0; i < 100; i++) {
			stocks_data.push({
				id: randomUUID(),
				companyId: companiesId[Math.floor(Math.random() * companiesId.length)],
				itemId: itemsId[Math.floor(Math.random() * itemsId.length)],
				stock: 5,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		const stocks = await queryInterface.bulkInsert('Stocks', stocks_data, {
			returning: true,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Auths', null, { returning: true });
		await queryInterface.bulkDelete('Users', null, { returning: true });
		await queryInterface.bulkDelete('Companies', null, { returning: true });
		await queryInterface.bulkDelete('CategoryItems', null, { returning: true });
		await queryInterface.bulkDelete('Items', null, { returning: true });
		await queryInterface.bulkDelete('Stocks', null, { returning: true });
	},
};
