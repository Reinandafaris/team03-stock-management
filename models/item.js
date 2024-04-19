"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Item.hasMany(models.Stock, {
      //     foreignKey: {
      //         name: "itemId",
      //     },
      // });
      // Item.belongsTo(models.CategoryItem, {
      //     foreignKey: {
      //         name: "categoryId",
      //     },
      // });
    }
  }

  Item.init(
    {
      categoryId: DataTypes.STRING,
      name: DataTypes.STRING,
      imageUrl: DataTypes.ARRAY(DataTypes.TEXT),
      imageId: DataTypes.ARRAY(DataTypes.TEXT),
      stock: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
