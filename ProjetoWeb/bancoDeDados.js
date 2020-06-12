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
            url: {
            type: String,
            required: true
            }
        })
    },

    modelNoticia(){
        return mongoose.model('Noticia', this.schemaNoticia())
    },

    salvarNoBd(model, objeto){
        var entrada = new model(objeto)
        entrada.save(function(err) {
            if (err) return handleError(err)
            else return "salvou"
        })
    },

    buscarNoBdPorValorContido(model, atributo, valor){
        const arg  = /.*valor.*/
         const query =  model.find({atributo: arg})
         console.log(query)
         return query
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