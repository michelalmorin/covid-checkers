function cadastrarUsuario(){
    document.addEventListener('DOMContentLoaded', function() {
        ativaBotaoCadastro()
        const formElement = document.getElementById('form-cad-usuario')

        formElement.onsubmit = e => {
            e.preventDefault()
            const user = e.target
            document.getElementById('dialog-cad-usuario').close()
            registrarUsuario(user)
        }
    })
}


function registrarUsuario(user){
    axios.post('/cadastrarUsuario',
    user)
    .then(res => {
        console.log("Usuario cadastrado com sucesso")
        alert("Cadastro efetuado com sucesso")
    }).catch(err => {
        console.log(err)
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