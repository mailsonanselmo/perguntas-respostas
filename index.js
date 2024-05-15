const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/pergunta");
const Resposta = require("./database/Resposta");
const Agendamento = require("./database/Agendamento");


connection
    .authenticate()
    .then(()=> {
        console.log("sucesso conexão!");
    }).catch((mgsErro) =>{
        console.log("sucesso falhou!");
    })


//configurando o ejs para o express
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get("/",(req, res) => {

    Pergunta.findAll({ raw:true, order:[
        ['id','DESC']
    ] }).then(perguntas =>{
        res.render("index",{
            perguntas: perguntas
        });
    });

    
});

app.get("/perguntar",(req, res) => {
    res.render("perguntar");
});

app.get("/pergunta/:id",(req, res) => {

    var id = req.params.id;

    Pergunta.findOne({ 
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[
                    ['createdAt', 'DESC']
                ]
            }).then(respostas =>{
                res.render("pergunta",{
                    pergunta : pergunta,
                    respostas : respostas
                });
            });            
        }else{
            res.redirect("/");
        }  
    }); 
});

app.post("/enviarpergunta",(req, res) => {

    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");
    });
});


app.post("/responder",(req, res) => {

    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId);
    });
});




      
app.listen(8080, ()=>{
    console.log("App rodando!!!");
});