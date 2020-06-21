
    require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const request = require('request')
const bcrypt = require('bcrypt')  
const flash = require('express-flash')
const session = require('express-session')
// const LocalStrategy = require('passport-local').Strategy
// const session = require('express-session')  
// const MongoStore = require('connect-mongo')(session)
const BancoDeDados = require('./bancoDeDados')
const mongoose = require('mongoose')
const passport = require('passport')  
const inicializaPassport = require('./passportConfig')

inicializaPassport(
    passport, 
    emailParam => { modelUsuarios.findOne({email: emailParam })}
    )


const app = express()
/*Servindo todos os arquivos estáticos*/
app.use(express.static('.'))
/*Decodificação do corpo de requisições*/
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view-engine', 'ejs')
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    //Resalvar a sessão se nada foi mudado?
    resave: false,
    //Savar um valor vazio se não há sessão?
    saveUninitialized: false
}))
app.use(passport.initialize())
//Armazenar variáveis ao longo de toda a sessão
app.use(passport.session())



global.conexao = BancoDeDados.conectaDb()
conexao.then(() => {
    const modelNoticias =BancoDeDados.modelNoticia()
    const modelUsuarios = BancoDeDados.modelUsuario()
    defineGetEPost(modelNoticias, modelUsuarios)
    app.listen(8081, () => console.log('Executando...'))
})
/*
require('./auth')(passport)
app.use(session({  
  store: new MongoStore({
    db: 'covid-checkers',
    url: 'mongodb://localhost:27017/covid-database',
    ttl: 5 * 60 // = 5 minutos de sessão
  }),
  secret: '123',//configure um segredo seu aqui
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session())


function authenticationMiddleware () {  
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login?fail=true')
  }
}

*/
function defineGetEPost(modelNoticias, modelUsuarios) {
    /*Testando requisições GET para URL '/teste

    app.get('/login', function(req, res){
     if(req.query.fail)
          res.status('400').send('Usuário e/ou senha incorretos!')
     else
         res.status('200').send('Usuário e/ou senha corretos!')
     })
 
    app.post('/login',
   
         passport.authenticate('local', { successRedirect: '/logged', failureRedirect: '/login?fail=true' })
    )
    
    app.get('/logged', authenticationMiddleware (), function(req, res){
    //   res.render('logged', { email: req.usuario.email });
        res.send("LOGIN EFETUADO NO EXPRESS")
    })
*/
    app.get('/teste', (req, res) => res.send('OK'))

    // app.post('/login', (req, res) => {
    //     console.log("IMPRIMINDO O USUARIO NO SERVER "+req.body.email)
    //     res.send({nome: req.body.email})
    //     // res.render("login.ejs", {nome: req.body.username})
    // })

    app.post('/login', passport.authenticate('local',{
        successRedirect: '/',
        failureMessage: 'Falha au autenticar usuario',
        failureFlash: true
    }
    ))

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
                        console.log("Usuário "+usuario.nome+" "+usuario.sobrenome+" salvo com sucesso")
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
        console.log('Chave de busca no axios', req.query.chaveDeBusca)
        BancoDeDados.buscarNoBdPorValorContido(modelNoticias, 'url', req.query.chaveDeBusca)
        .then((resultado)=> {
            res.send(resultado)
        })
    })

   
}



/*EXECUTANDO O SERVIDOR*/
