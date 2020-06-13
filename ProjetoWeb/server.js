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
  //s  modelNoticias.create({url: "https://noticias.uol.com.br/ultimas-noticias/afp/2020/06/09/peru-supera-os-200000-casos-de-covid-19-com-hospitais-quase-saturados.htm"})
   // Inicializador.inicializar()
    defineGetEPost(modelNoticias)
    app.listen(8081, () => console.log('Executando...'))
})

function defineGetEPost(modelNoticias) {
    /*Testando requisições GET para URL '/teste*/
    app.get('/teste', (req, res) => res.send('OK'))

    app.post('/postarNoticia', (req, res) => {
        const urlNoticia = req.body
        modelNoticias.findOne({url: urlNoticia}, (err, result) => {
            if(result == null){
                const objetoNoticia = {url: urlNoticia}
                modelNoticias.create(urlNoticia, (err, urlNoticia) =>{
                   if(err) console.log(err)
                   else{
                    inicializar(res)
                     console.log("Objeto criado "+urlNoticia)
                   } 
                })
            }
        })
    })

    // app.post('/cadastrarNoticia', (req, res) => {
    //     const url = req.body
    //     request(req.query.endereco, function (error, response, body) {
    //         obtemInfoNoticia(body)
    //     })
    // })

    // function obtemInfoNoticia(body){

    // }

    app.get('/geradorPreview', (req, res) => {
        console.log("URL NO GERADOR PREVIEW?  "+req.query.endereco)
        request(req.query.endereco, function (error, response, body) {
            res.send({ ret: body })
        })
    })

    app.get('/inicializar', (req, res) => {
        inicializar(res)
    })
    function inicializar(res){
        modelNoticias.find().then(resultado => {
            res.send(resultado)
         })
    }


    app.get('/buscar', (req, res) => {
       const noticias =  BancoDeDados.buscaNoBdPorValorContido(modelNoticias, 'url', req.query.chaveDebusca)
       res.send(noticias)
    })
}

/*EXECUTANDO O SERVIDOR*/
