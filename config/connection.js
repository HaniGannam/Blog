const config = require('./database');
const { Sequelize, DataTypes } = require('sequelize');
// const Sequelize = require('sequelize')

// INITIALIZATION--
const sequelize = new Sequelize(
  config.database, config.username, config.password,
  {
    host: config.host,
    //port:'25060',
    dialect: "mysql"
  });


// AUTHENTICATION--
sequelize.authenticate()
  .then(() => {
    console.log('--database connected--');
  }).catch(err =>
    console.log(`Error:${err}`));


// CONNECTION-PROVIDER--
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.blog = require('../routes/Blog/blog.model')(sequelize, DataTypes);



// SYNCING--
db.sequelize.sync({ alter: true, force: false })
  .then(() => {
    console.log("--sync done--");
  }).catch(err => {
    console.log(`error:${err}`);
  });

module.exports = db
