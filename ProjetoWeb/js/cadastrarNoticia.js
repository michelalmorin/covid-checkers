/*Trata a submissão de url de notícia pelo usuário, enviado ao back-end*/


function cadastraNoticia() {
    document.addEventListener("DOMContentLoaded", function () {
        clicarPraCadastrar()
        const formCadNot = document.getElementById("form-cad-noticia")

        formCadNot.onsubmit = e => {
            e.preventDefault()
            const form = e.target
            const urlNoticia = form.urlNoticia.value
            document.getElementById('dialogo-URL').close()
            postNoticia(urlNoticia)
         
        }
    })
}


function postNoticia(urlNoticia, titu) {
    axios.post('/postarNoticia',
        { url: urlNoticia})
        .then(resp => {
            console.log("Noticia salva com sucesso")
            appendNoticia(urlNoticia)
        }).catch(err => {
            console.log(err)
        })
}


function clicarPraCadastrar() {
    const botao = document.getElementById('button-cadastrar-news')
    botao.onclick = () => {
        document.getElementById('dialogo-URL').showModal()
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
            gerarPreview(res.data.ret, noticia, url)
            return res.data
        })
}


function gerarPreview(html, divDaNoticia, url) {
    const htmlDaNoticia = document.getElementById("html-externo")
    /*Preciso colocar o html da noticia dentro do meu html pra adicionar e navegar por ele pela DOM*/
    htmlDaNoticia.innerHTML = html
    const titulo = obtemConteudoMeta(htmlDaNoticia, '[property="og:title"]')
    const descricao = obtemConteudoMeta(htmlDaNoticia, '[property="og:description"]')
    const imagem = obtemConteudoMeta(htmlDaNoticia, '[property="og:image"]')

    /*Coloca o conteudo do preview dentro de uma div de notícia*/
    appendConteudo(divDaNoticia, titulo, 'label')
    appendConteudo(divDaNoticia, descricao, 'div')
    appendConteudo(divDaNoticia, imagem, 'img')
    tornarClicavel(htmlDaNoticia, divDaNoticia)
}


function tornarClicavel(htmlDaNoticia, divDaNoticia) {
    divDaNoticia.onmouseover = () => {
        divDaNoticia.style.cursor = 'pointer'
    }

    divDaNoticia.onclick = () => {
        window.open(obtemConteudoMeta(htmlDaNoticia, '[property="og:url"]'));
    }
}


function appendConteudo(divMae, conteudo, tipoElemento) {
    const elemento = document.createElement(tipoElemento)
    if (tipoElemento == 'img') elemento.setAttribute('src', conteudo)
    else elemento.innerHTML = conteudo
    divMae.appendChild(elemento)
}


function obtemConteudoMeta(html, propriedade) {
    return html.querySelector(propriedade).getAttribute('content')
}

cadastraNoticia()


