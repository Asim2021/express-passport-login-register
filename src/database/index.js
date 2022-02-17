const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    "node-login",
    "root",
    "",
    {
      host: "localhost",
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
)

// TO CHECK THE CONNECTION ESTABLISHMENT WE USE AUTHENTICATE PROMISE
sequelize
.authenticate()
.then(() => {
    console.log(`MYSQL Connection has been established`);
})
.catch((error) => {
    console.error("Unable to connect to the database:", error);
});

/// db.sequelize.sync() is necessary
// {force : true} for development only as it drops db
sequelize.sync();

module.exports = sequelize;