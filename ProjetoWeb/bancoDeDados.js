/*Mongoose é uma ferramenta de modelagem de objetos (ODM) pro MongoDB*/
const mongoose = require('mongoose')

module.exports = {

   conectaDb(){
        /*Seta a conexão default*/
        const uri = 'mongodb://localhost:27017/covid-database'
        mongoose.Promise = global.Promise
       return mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(function(conexao){
            return conexao
        }).catch(function(err){
            console.log("MONGODB: erro ao conectar", err)
        })
        /*Salva ela numa var*/
       // var conexaoDb = mongoose.connection
        //Liga a conexão a eventos de erro, pra poder obter os erros de conexão
         //conexaoDb.on('error', console.error.bind(console, 'Erro de conexao MongoDB:'))
        // return conexaoDb
   },

   schemaNoticia(){
       return new mongoose.Schema({
            url: String
        },
        {typeKey: '$type'}
        )
    },

    schemaUsuario(){
        return new mongoose.Schema({
            nome: String,
            sobrenome: String,
            dataNascimento: Date,
            genero: String,
            email: String,
            senha: String
        })
    },

    modelNoticia(){
        return mongoose.model('Noticia', this.schemaNoticia())
    },

    modelUsuario(){
        return mongoose.model('Usuario', this.schemaUsuario())
    },

    salvarNoBd(model, objeto){
        var entrada = new model(objeto)
        entrada.save(function(err) {
            if (err) return handleError(err)
            else return "salvou"
        })
    },

    async buscarNoBdPorValorContido(model, atributo, valor){
        var valores = valor.split(` `)
        var documentos = valores.map(value => {
            const query = model.find({url: {'$in': [new RegExp(`.*${value}.*`, 'i')]}})
            return query.exec() // não precisa utilizar await aqui, não terá nenhum efeito prático
        })
        var resultados = await Promise.all(documentos)
        return resultados  
       
    },

    buscarNoBdPorValor(model, atributo, valor){
         const query =  model.find({atributo: valor})
         console.log("Objeto query  ", query)
        //  var promise = query.exec()
        //  promise.addBack((err, docs) => {
        //      if(err) console.log("Erro ao realizar busca por valor de atributo", err)
        //      else console.log(docs)
        //  })
        //  return

    }
}


/*
/*Cria uma instância de notícia do BD e salva nele
function salvarNoticia(noticia){
    var not = new NoticiaModel(noticia)
    not.save(function(err) {
        if (err) return handleError(err)
    })
}

function buscarNoticias(argumento){
    const arg  = /.*argumento.
   const noticia =  NoticiaModel.find({"titulo": arg})
   console.log(noticia)
}
*/