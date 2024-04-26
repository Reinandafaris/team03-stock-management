const axios = require('axios');

const login = (req, res, next) => {
	axios
		.post('http://localhost:2000/api/v1/users/login', {
			email: 'superadmin@mail.com',
			password: 'password',
		})
		.then((response) => {
			const users = response.data;

			res.cookie('_token', users.token, {
				httpOnly: true,
				maxAge: 24 * 60 * 60 * 1000,
			});

			res.render('superadmin/index', {
				_token: users.token,
			});
		})
		.catch((error) => {
			console.error(error);
			next();
		});
};

const getUsersPage = (req, res, next) => {
	// axios
	// 	.get('http://localhost:2000/api/v1/users')
	// 	.then((response) => {
	// 		const users = response.data;

	res.render('superadmin/index');
	// })
	// .catch((error) => {
	// 	console.error(error);
	// 	next();
	// });
};

module.exports = {
	login,
	getUsersPage,
};
