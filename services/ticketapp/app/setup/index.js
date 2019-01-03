const Sequelize = require('sequelize');
const sequelize = new Sequelize('ticketdatabase', 'test', 'test', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate()
          .then(() => {
              console.log("SUCCESSFULLY CONNECTED TO THE DATABASE.");
          })
        
const User = require('../models/User')(sequelize, Sequelize)

sequelize.sync({
    force: false
}).then(() => {
    console.log("DATABASE SYNCED.")
})

module.exports = {
    User
}