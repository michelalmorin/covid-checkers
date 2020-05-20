/*Trata a submissão de url de notícia pelo usuário, enviado ao back-end*/


function cadastraNoticia() {
    document.addEventListener("DOMContentLoaded", function () {
        clicarPraCadastrar()
        const formCadNot = document.getElementById("form-cad-noticia")

        axios.get('/teste').then(resp => {
            console.log(resp)
        })

        formCadNot.onsubmit = e => {
            e.preventDefault()
            const form = e.target
            const urlNoticia = form.urlNoticia.value
            document.getElementById('dialogo-URL').close()

            axios.post('/cadastrarNoticia',
                { url: urlNoticia })
                .then(resp => {
                    console.log("REsposta "+resp.status)
                    if (resp.status == 200) appendNoticia(urlNoticia)
                    else appendNoticia("ERRO AO SALVAR NOTICIA NO BANCO DE DADOS")
                })

        }
    })
}

function clicarPraCadastrar(){
    const botao = document.getElementById('button-cadastrar-news')
    botao.onclick = () => {
        document.getElementById('dialogo-URL').show()
    }
}


function appendNoticia(url) {
    const noticia = document.createElement('div')
    const conteudoNoticia = gerarPreview(url)
    console.log("Conteudo Notícia"+conteudoNoticia)
    // noticia.innerHTML = conteudoNoticia  ESSE É O CORRETO
    noticia.innerHTML = url  //apenas pra teste
    noticia.classList.add('noticia')
    const feed = document.getElementById('feed')
    feed.insertAdjacentElement('afterbegin', noticia)
}

function gerarPreview(url) {
    var retorno = null
   axios.get('/geradorPreview', {url: url})
            .then(res => {
                console.log("REsultado do GET: " +res.data.ret)
                console.log(typeof res.data.ret)
                return res.data
            })
  
}

cadastraNoticia()