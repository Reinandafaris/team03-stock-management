'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Companies extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Companies.hasOne(models.User, {
				foreignKey: {
					name: 'companyId',
				},
			});

			Companies.hasMany(models.Stock, {
				foreignKey: {
					name: 'companyId',
				},
			});
		}
	}
	Companies.init(
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
				unique: {
					args: true,
					msg: 'Please enter unique id',
				},
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Companies',
		}
	);
	return Companies;
};
