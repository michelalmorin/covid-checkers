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
    axios.post('/login',
    login)
    .then(res => {
        console.log("res.data.validou"+res.data)
        if(res.data.validou == true){
            sessionStorage.clear()
            sessionStorage.setItem('usuarioLogado', login.email)
            mostraLogado(res.data.nome, res.data.sobrenome)
            alert("Usuario logado com sucesso")
        }else {
            alert("Senha incorreta")
        }
    }).catch(err => {
        alert("Falha ao logar usuario")
        console.log("Falha logar usuario"+err)
    })
}

function mostraLogado(nome, sobrenome) {
    const nomeCompleto = nome.concat(' ', sobrenome)
    const infoSessao = document.getElementById('infoSessao')
    const usuarioLogado = document.createElement('p')
    usuarioLogado.innerHTML = nomeCompleto
    usuarioLogado.setAttribute('id', 'usuario-logado')
    const sair = document.getElementById("sair")
    infoSessao.insertBefore(usuarioLogado, sair)
    sair.style.display = 'block'
}

function ativarBotaoLogin(){
    const botao = document.getElementById('login')
    botao.onclick = e => {
         const dialog = document.getElementById('dialogo-login')
         dialog.style.display = 'flex'
    }
}

function sairDaSessao(params) {
    
}

logar()