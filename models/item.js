'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Item extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Item.hasMany(models.Stock, {
				foreignKey: {
					name: 'itemId',
				},
			});
			Item.belongsTo(models.CategoryItems, {
				foreignKey: {
					name: 'categoryId',
				},
			});
		}
	}

	Item.init(
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
			categoryId: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			imageUrl: DataTypes.ARRAY(DataTypes.TEXT),
			imageId: DataTypes.ARRAY(DataTypes.TEXT),
			stock: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Item',
		}
	);
	return Item;
};
