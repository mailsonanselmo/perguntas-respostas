const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define('Resposta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    } 
});

Resposta.sync({force: false}).then(()=>{
    console.log("Tabela resposta criada!");
});

module.exports = Resposta;