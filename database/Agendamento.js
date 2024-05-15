const Sequelize = require("sequelize");
const connection = require("./database");

const Agendamento = connection.define('Agendamento',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    } 
});

Agendamento.sync({force: false}).then(()=>{
    console.log("Tabela agendamento criada!");
});

module.exports = Agendamento;