'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Auth extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Auth.belongsTo(models.User, {
				foreignKey: {
					name: 'userId',
				},
			});
		}
	}
	Auth.init(
		{
			userId: DataTypes.STRING,
			email: {
				type: DataTypes.STRING,
				unique: {
					args: true,
					msg: 'Please enter unique email',
				},
				validate: {
					isEmail: true,
				},
			},
			password: DataTypes.STRING,
			confirmPassword: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Auth',
		}
	);
	return Auth;
};
