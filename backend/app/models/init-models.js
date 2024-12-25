var DataTypes = require("sequelize").DataTypes;
var _card = require("./card");
var _category = require("./category");

function initModels(sequelize) {
  var card = _card(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);


  return {
    card,
    category,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
