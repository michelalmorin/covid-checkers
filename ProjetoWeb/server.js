const bodyParser = require('body-parser')
const express = require('express')
const request = require('request')
const BancoDeDados = require('./bancoDeDados')
//const Inicializador = require('./inicializarApp')
const mongoose = require('mongoose')

const app = express()
/*Servindo todos os arquivos estáticos*/
app.use(express.static('.'))
/*Decodificação do corpo de requisições*/
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const conexao = BancoDeDados.conectaDb()
conexao.then(() => {
    const modelNoticias =BancoDeDados.modelNoticia()
    modelNoticias.create({url: "https://noticias.uol.com.br/ultimas-noticias/afp/2020/06/09/peru-supera-os-200000-casos-de-covid-19-com-hospitais-quase-saturados.htm"})
   // Inicializador.inicializar()
    defineGetEPost(modelNoticias)
    app.listen(8081, () => console.log('Executando...'))
})

function defineGetEPost(modelNoticias) {
    /*Testando requisições GET para URL '/teste*/
    app.get('/teste', (req, res) => res.send('OK'))

    app.post('/cadastrarNoticia', (req, res) => {
        const urlNoticia = req.body
        const persistiu = true
        /*Aqui será inclusa a chamada do método que persistirá as notícias
        if (persistiu) {
            res.send({...req.body, status: true})
        }
        else{
            res.send({status: false})
        } */
        res.send({ status: true })
    })

    app.get('/geradorPreview', (req, res) => {
        request(req.query.endereco, function (error, response, body) {
            res.send({ ret: body })
        })
    })

    app.get('/inicializar', (req, res) => {
        //console.log("ModelNoticias"+modelNoticias)
        modelNoticias.find().then(resultado => {
            res.send(resultado)
         })
   
    })
}

/*EXECUTANDO O SERVIDOR*/
