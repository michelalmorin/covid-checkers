const bodyParser = require('body-parser')
const express = require('express')

const app = express()

/*Servindo todos os arquivos estáticos*/ 
app.use(express.static('.'))
/*Decodificação do corpo de requisições*/ 
app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json()) 

/*Testando requisições GET para URL '/teste*/ 
app.get('/teste', (req, res) => res.send('OK'))

app.post('/cadastrarNoticia', (req, res) => {
   /* const urlNoticia = req.query.url
    console.log(req.query.url+"aaaa")
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

/*EXECUTANDO O SERVIDOR*/
app.listen(8081, () => console.log('Executando...')) 