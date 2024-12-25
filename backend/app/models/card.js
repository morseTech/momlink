const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('card', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "标识链密码"
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "平台分类"
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "名称"
    },
    platformId: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "平台id"
    },
    qrcode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "入口二维码"
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      comment: "是否接受公开查询"
    }
  }, {
    sequelize,
    tableName: 'card',
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "chainId",
        using: "BTREE",
        fields: [
          { name: "password" },
        ]
      },
    ]
  });
};
