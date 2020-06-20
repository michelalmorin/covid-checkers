function logar(){

    document.addEventListener('DOMContentLoaded', function(){
        ativarBotaoLogin()
    
        const formElement = document.getElementById('form-login')
    
        formElement.onsubmit = e => {
            console.log('submit')
            e.preventDefault()
            const formUser = e.target
            const dialog = document.getElementById('dialogo-login')
            dialog.close()
            dialog.style.display = 'none'
            const login = new Login(formUser.email.value, formUser.password.value)
            registrarLogin(login)
        }
    })
}

function Login(email, senha){
    this.email = email
    this.senha = senha
}

function registrarLogin(login){
    console.log(login)
    axios.post('/login',
    login)
    .then(res => {
        
        console.log("Retorno do server"+Object.values(res.data))
        alert("Usuario logado com sucesso")
    }).catch(err => {
        alert("Falha ao logar usuario")
        console.log("Falha logar usuario"+err)
    })
}

function ativarBotaoLogin(){
    const botao = document.getElementById('login')
    botao.onclick = e => {
         const dialog = document.getElementById('dialogo-login')
         dialog.style.display = 'flex'
    }
}

logar()