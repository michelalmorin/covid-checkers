const { authenticate } = require('passport')

const LocalStrategy = require('passport-local').Strategy



function inicializarPass(passport){
    const authenticateUser = (email, password, done) => {

    }
    passport.use(LocalStrategy({userNameField: 'email'}),
        authenticateUser
    )
    /*Serializa o usuário para armazenar na sesão */
    passport.serializeUser((user, done) => {  }) 
    passport.deserializeUser((id, done) => {

    })
}