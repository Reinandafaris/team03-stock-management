'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Stock extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Stock.belongsTo(models.Item, {
				foreignKey: {
					name: 'itemId',
				},
			});
			Stock.belongsTo(models.Companies, {
				foreignKey: {
					name: 'companyId',
				},
			});
		}
	}
	Stock.init(
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
			companyId: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			itemId: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			stock: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Stock',
		},
		{
			freezeTableName: true,
		}
	);
	return Stock;
};
