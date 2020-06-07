const bodyParser = require('body-parser')
const express = require('express')
const request = require('request')
const bancoDeDados = require('./bancoDeDados')
const mongoose = require('mongoose')


const conexao = bancoDeDados.conectaDb()
const modelNoticias = bancoDeDados.modelNoticia()
bancoDeDados.salvarNoBd(modelNoticias, {url: "www.google.com"})
// bancoDeDados.conectarDB().catch(error => console.log(error.stack))
const app = express()

/*Servindo todos os arquivos estáticos*/ 
app.use(express.static('.'))
/*Decodificação do corpo de requisições*/ 
app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json()) 


/*Testando requisições GET para URL '/teste*/ 
app.get('/teste', (req, res) => res.send('OK'))

app.post('/cadastrarNoticia', (req, res) => {
    const urlNoticia = req.body
    console.log(bancoDeDados.salvarNoBd(noticiaModel, urlNoticia))
    const persistiu = true
    /*Aqui será inclusa a chamada do método que persistirá as notícias
    if (persistiu) {
        res.send({...req.body, status: true})
    }
    else{
        res.send({status: false})
    } */
    res.send({status: true})
})

app.get('/geradorPreview', (req, res) =>{
    request(req.query.endereco, function (error, response, body) {
        res.send({ret: body})
     })
})


app.listen(8081, () => console.log('Executando...')) 
 
/*EXECUTANDO O SERVIDOR*/
