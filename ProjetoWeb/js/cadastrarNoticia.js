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
    const conteudoNoticia = obtemHTMLNoticia(url, noticia)
    noticia.classList.add('noticia')
    const feed = document.getElementById('feed')
    feed.insertAdjacentElement('afterbegin', noticia)
}

function obtemHTMLNoticia(url, noticia) {
    var retorno = null
    axios.get('/geradorPreview', {
        params: {
            endereco: url
        } 
    })
            .then(res => {
                gerarPreview(res.data.ret, noticia)
                // console.log("REsultado do GET: " +res.data.ret)
                // console.log(typeof res.data.ret)
                return res.data
            })
}

function gerarPreview(html, divDaNoticia){
    const htmlDaNoticia = document.getElementById("html-externo")
    /*Preciso colocar o html da noticia dentro do meu html pra adicionar e navegar por ele pela DOM*/
    htmlDaNoticia.innerHTML = html
    const titulo = obtemConteudoMeta(htmlDaNoticia, '[property="og:title"]')
    const descricao = obtemConteudoMeta(htmlDaNoticia, '[property="og:description"]' )
    const imagem = obtemConteudoMeta(htmlDaNoticia, '[property="og:image"]')
    
    /*Coloca o conteudo do preview dentro de uma div de notícia*/ 
    appendConteudo(divDaNoticia, titulo, 'label')
    appendConteudo(divDaNoticia, descricao, 'div')
    appendConteudo(divDaNoticia, imagem, 'img')
}

function appendConteudo(divMae, conteudo, tipoElemento){
    const elemento = document.createElement(tipoElemento)
    if(tipoElemento == 'img')  elemento.setAttribute('src', conteudo)
    else elemento.innerHTML = conteudo
    divMae.appendChild(elemento)
}

function obtemConteudoMeta(html, propriedade){
    return html.querySelector(propriedade).getAttribute('content')
}

cadastraNoticia()