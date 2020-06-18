const bodyParser = require('body-parser')
const express = require('express')
const request = require('request')
const BancoDeDados = require('./bancoDeDados')
//const Inicializador = require('./inicializarApp')
const mongoose = require('mongoose')
const { modelUsuario } = require('./bancoDeDados')

const app = express()
/*Servindo todos os arquivos estáticos*/
app.use(express.static('.'))
/*Decodificação do corpo de requisições*/
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const conexao = BancoDeDados.conectaDb()
conexao.then(() => {
    const modelNoticias =BancoDeDados.modelNoticia()
    const modelUsuarios = BancoDeDados.modelUsuario()
    defineGetEPost(modelNoticias, modelUsuarios)
    app.listen(8081, () => console.log('Executando...'))
})

function defineGetEPost(modelNoticias, modelUsuarios) {
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

    app.post('/cadastrarUsuario', (req, res) => {
        const cadastro = req.body
        console.log(cadastro[0])
        // console.log('CADASTRO DO USUARIO'+ Object.values(cadastro.nome[0]))
        modelUsuarios.findOne({nome: cadastro.nome, sobrenome: cadastro.sobrenome}, (err, result) =>{
            if(result == null){
                modelUsuarios.create(cadastro, (err, urlNoticia) => {
                    if(err) console.log("Falha ao cadastrar usuário \n"+err)
                    else{
                        console.log("Usuário "+cadastro.nome+" "+cadastro.sobrenome+" salvo com sucesso")
                    }
                })
            }
        })
    })

    app.get('/geradorPreview', (req, res) => {
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


    app.get('/buscar',  (req, res) => {
        console.log('Chave de busca no axios', req.query.chaveDeBusca)
        BancoDeDados.buscarNoBdPorValorContido(modelNoticias, 'url', req.query.chaveDeBusca)
        .then((resultado)=> {
            res.send(resultado)
        })
    })

   
}

/*EXECUTANDO O SERVIDOR*/
