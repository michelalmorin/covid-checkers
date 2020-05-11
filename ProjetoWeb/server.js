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

/*EXECUTANDO O SERVIDOR*/
app.listen(8081, () => console.log('Executando...')) 