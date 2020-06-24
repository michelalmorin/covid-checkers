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
   },

   schemaNoticia(){
       return new mongoose.Schema({
            url: String,
            positivos: Number,
            negativos: Number
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

    async buscarNoBdPorValor(model, atributo, valor){
         const query =  await model.findOne({atributo: valor})
        return query
    },

    async buscarNoticiaPraVotos(model, valor){
        const query =  await model.find({url: valor})
        return query
    },

    async registrarVoto(modelNoticias, noticia, tipo){
        let voto = null
        var result = null
        if(tipo == 'positivos'){
            voto = noticia.positivos
            voto++
            result = await modelNoticias.findOneAndUpdate({_id: noticia._id}, {positivos: voto}, {new: true})
        } 
        else if(tipo == 'negativos'){
            voto = noticia.negativos
            voto++
            result = await modelNoticias.findOneAndUpdate({_id: noticia._id}, {negativos: voto}, {new: true})
        }
    
        return result
    }
}
