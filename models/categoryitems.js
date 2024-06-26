'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class CategoryItems extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			CategoryItems.hasMany(models.Item, {
				foreignKey: {
					name: 'categoryId',
				},
			});
		}
	}
	CategoryItems.init(
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
			modelName: 'CategoryItems',
		}
	);
	return CategoryItems;
};
