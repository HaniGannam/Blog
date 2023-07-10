const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  blog = sequelize.define("blog", {
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  });
  return blog;
};
