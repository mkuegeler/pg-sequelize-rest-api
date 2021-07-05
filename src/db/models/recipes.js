'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Recipes.init({
    uid: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    doc: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Recipes',
  });
  return Recipes;
};