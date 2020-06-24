const bodyParser = require('body-parser')
const express = require('express')
const request = require('request')
const bcrypt = require('bcrypt')  
const BancoDeDados = require('./bancoDeDados')
const mongoose = require('mongoose')
const { buscarNoBdPorValor } = require('./bancoDeDados')
const bancoDeDados = require('./bancoDeDados')



const app = express()
/*Servindo todos os arquivos estáticos*/
app.use(express.static('public'))
/*Decodificação do corpo de requisições*/
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

global.conexao = BancoDeDados.conectaDb()
conexao.then(() => {
    const modelNoticias =BancoDeDados.modelNoticia()
    const modelUsuarios = BancoDeDados.modelUsuario()
    defineGetEPost(modelNoticias, modelUsuarios)
    app.listen(8081, () => console.log('Executando...'))
})

function defineGetEPost(modelNoticias, modelUsuarios) {
   
  
    app.post('/postarNoticia', (req, res) => {
        const urlNoticia = req.body.url
        modelNoticias.findOne({url: urlNoticia}, (err, result) => {
            if(result == null){
                const id = mongoose.Types.ObjectId()
          
                const objetoNoticia = {_id: id, url: urlNoticia, positivos: 0, negativos:0}
                modelNoticias.create(objetoNoticia, (err, urlNoticia) =>{
                   if(err) console.log(err)
                   else{
                    inicializar(res)
                   } 
                })
            }
        })
    })

    app.post('/cadastrarUsuario', async (req, res) => {
        const usuario = req.body
        usuario.id = mongoose.Types.ObjectId()
        console.log("Objeto usuario antes de ser salvo:"+Object.keys(usuario))
        try {
            const hashedSenha = await bcrypt.hash(usuario.senha, 10)
            usuario.senha = hashedSenha
            console.log(hashedSenha)
            continuaCadUsuario(usuario, res)
        } catch (error) {
            console.log(err)
            res.send("Falha ao salvar senha do usuario")
        }
       
    })

    function continuaCadUsuario(usuario, res){
        modelUsuarios.findOne({nome: usuario.nome, sobrenome: usuario.sobrenome}, (err, result) =>{
            if(result == null){
                modelUsuarios.create(usuario, (err, urlNoticia) => {
                    if(err) console.log("Falha ao cadastrar usuário \n"+err)
                    else{
                       // console.log("Usuário "+usuario.nome+" "+usuario.sobrenome+" salvo com sucesso")
                        res.send(usuario)
                    }
                })
            }
        })
    }

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
        BancoDeDados.buscarNoBdPorValorContido(modelNoticias, 'url', req.query.chaveDeBusca)
        .then((resultado)=> {
            res.send(resultado)
        })
    })

    app.post('/login', async (req, res) => {
        const senha = req.body.senha
        const senhaNoBd = await buscarSenha(req.body.email)
      
        const testaSenha = await(bcrypt.compare(senha, senhaNoBd.senha))
        if(testaSenha == true) res.send({_id: senhaNoBd._id, nome: senhaNoBd.nome, sobrenome: senhaNoBd.sobrenome, validou: true})
        else res.send({validou: false})
    })
    
    app.get('/buscarNoticia', async (req, res) => {
        const noticia = await BancoDeDados.buscarNoticiaPraVotos(modelNoticias, req.query.url)
        res.send(noticia)
    })

    async function buscarSenha(emailParam){
        const senha = await modelUsuarios.findOne({email: emailParam}, 'nome sobrenome senha')
        return senha
    }

    app.post('/registrarVoto', async (req, res) => {
        const noticia  = await BancoDeDados.buscarNoticiaPraVotos(modelNoticias, req.body.url)
        const notAtualizada = await bancoDeDados.registrarVoto(modelNoticias, noticia[0], req.body.tipo)
        console.log('notAtualizada '+notAtualizada)
        res.send(notAtualizada)
    })

   
}