const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

async function initialize(passport, buscarUsuario){
    const authenticateUser = (email, password, done) => {
        const user = buscarUsuario(email)
        if(user == null){
            /*Done é a versão chamada quanto a autenticação é concluída
            O primeiro parâmetro é um erro, se for o caso. O segundo é o usuário
            que foi encontrado. Como deu fail, é false.*/ 
            return done(null, false, {message: 'Nenhum usuário com esse e-mail'})
        } 
        
        //Conferir se a senha confere
        try {
            if (await bcrypt.compare(password, user.senha)){
                return done(null, user)
            }
            else {
                return done(null, false, {message: 'Senha incorreta'})
            }
        } catch (error) {
            return done(error)
        }

    }
    passport.use(LocalStrategy({userNameField: 'email'},
        authenticateUser))
    /*Serializa o usuário para armazenar na sesão */
    passport.serializeUser((user, done) => {  }) 
    passport.deserializeUser((id, done) => {

    })
}

module.exports = initialize