const {Sequelize} = require('sequelize')
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect : "mysql",
    pool : {
      max : 5,
      min : 0,
      acquire : 30000,
      idle : 10000
    },
    logging : false
  }
)

var DataTypes = require("sequelize").DataTypes;
var _barang = require("./barang");
var _users = require("./users");

function initModels(sequelize) {
  var barang = _barang(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    barang,
    users,
  };
}

const models = initModels(sequelize);
module.exports = {sequelize, models}

// module.exports = initModels;
// module.exports.initModels = initModels;
// module.exports.default = initModels;
