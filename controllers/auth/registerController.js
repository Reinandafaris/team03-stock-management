const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');
const { User, Auth, sequelize } = require('../../models');
const handleUploadImage = require('../../utils/handleUpload');

const register = async (req, res, next) => {
	try {
		const { email, password, confirmPassword, name, role } = req.body;

		const files = req.files;

		const images = {
			imagesUrl: [],
			imagesId: [],
		};

		const userExist = await Auth.findOne({
			where: {
				email,
			},
		});

		if (userExist) {
			return next(createHttpError(400, { message: 'User email already taken' }));
		}

		// hashing password
		const saltRounds = 10;
		const hashedPassword = bcrypt.hashSync(password, saltRounds);
		const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

		if (files) {
			const { imagesUrl, imagesId } = await handleUploadImage(files);

			images.imagesUrl = imagesUrl;
			images.imagesId = imagesId;
		}

		const transaction = await sequelize.transaction();
		try {
			const newUser = await User.create(
				{
					// id: randomUUID(),
					name,
					companyId: 1,
					role,
					imageUrl: images.imagesUrl,
					imageId: images.imagesId,
				},
				{ transaction }
			);

			const authUser = await Auth.create(
				{
					// id: randomUUID(),
					email,
					password: hashedPassword,
					confirmPassword: hashedConfirmPassword,
					userId: newUser.id,
				},
				{ transaction }
			);

			await transaction.commit();

			res.status(201).json({
				status: true,
				message: 'create user successfully!',
				data: {
					user: {
						...newUser.dataValues,
					},
					auth: {
						...authUser.dataValues,
					},
				},
			});
		} catch (error) {
			await transaction.rollback();
			next(createHttpError(500, { message: error.message }));
		}
	} catch (error) {
		next(createHttpError(500, { message: error.message }));
	}
};

module.exports = {
	register,
};
