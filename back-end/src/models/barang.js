const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('barang', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama_barang: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    harga_beli: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    harga_jual: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stok_barang: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    foto_barang: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'barang',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
