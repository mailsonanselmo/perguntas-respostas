const sequelize = require('sequelize');


const connection = new sequelize('perguntas_db', 'root', 'root',{
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = connection;