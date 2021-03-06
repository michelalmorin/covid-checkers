function cadastrarUsuario(){
    document.addEventListener('DOMContentLoaded', function() {
        ativaBotaoCadastro()
        const formElement = document.getElementById('form-cad-usuario')

        formElement.onsubmit = e => {
            e.preventDefault()
            const formUser = e.target
            const dialog = document.getElementById('dialogo-cad-usuario')
            dialog.close()
            dialog.style.display = 'none'
            const usuario = new Usuario(formUser.nome.value, 
                formUser.sobrenome.value, formUser.dataDeNascimento.value,
                formUser.genero.value, formUser.email.value, formUser.senha.value)
            registrarUsuario(usuario)
        }
    })
}

function Usuario(nome, sobrenome, dataDeNascimento, genero, email, senha){
    this.nome = nome
    this.sobrenome = sobrenome
    this.dataDeNascimento = dataDeNascimento
    this.genero = genero
    this.email = email
    this.senha = senha
}


function registrarUsuario(user){
    console.log(user)
    axios.post('/cadastrarUsuario',
    user)
    .then(res => {
        console.log("Usuario cadastrado com sucesso")
        alert("Cadastro efetuado com sucesso")
    }).catch(err => {
        alert("Falha ao efetuar cadastro")
        console.log("Falha ao cadastrar usuário"+err)
    })
}


function ativaBotaoCadastro(){
        
     const botaoCadastrar = document.getElementById('cadastrar-se')

     console.log(botaoCadastrar)
     botaoCadastrar.onclick = e => {
         const dialog = document.getElementById('dialogo-cad-usuario')
         dialog.style.display = 'flex'
        //  dialog.showModal()
     }
}

cadastrarUsuario()