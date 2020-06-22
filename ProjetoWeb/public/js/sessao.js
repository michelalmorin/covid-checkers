function logar(){

    document.addEventListener('DOMContentLoaded', function(){
        ativarBotaoLogin()
        sairDaSessao()
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
            sessionStorage.setItem('usuarioLogado', JSON.stringify(res.data))
            console.log('Usuario logado '+Object.keys(res.data) )
            mostraLogado(res.data._id, res.data.nome, res.data.sobrenome)
            alert("Usuario logado com sucesso")
        }else {
            alert("Senha incorreta")
        }
    }).catch(err => {
        alert("Falha ao logar usuario")
        console.log("Falha logar usuario"+err)
    })
}

function mostraLogado(_id, nome, sobrenome) {
    const nomeCompleto = nome.concat(' ', sobrenome)
    const infoSessao = document.getElementById('infoSessao')
    infoSessao.setAttribute('idUsuario', _id)

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

function sairDaSessao() {
        const botaoSair = document.getElementById('sair')
        botaoSair.onclick = e => {
            document.getElementById('usuario-logado').remove()
            if(estaLogado()){
                sessionStorage.clear()
            }
        }
}

function estaLogado(){
    if(sessionStorage.getItem('usuarioLogado') != null || sessionStorage.getItem('usuarioLogado') != undefined){
        return true
    }else return false
}

logar()