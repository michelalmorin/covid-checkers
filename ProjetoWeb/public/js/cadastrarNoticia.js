/*Trata a submissão de url de notícia pelo usuário, enviado ao back-end*/


function cadastraNoticia() {
    document.addEventListener("DOMContentLoaded", function () {
        clicarPraCadastrar()
        const formCadNot = document.getElementById("form-cad-noticia")

        formCadNot.onsubmit = e => {
            e.preventDefault()

            if(estaLogado()){
                const form = e.target
                 const urlNoticia = form.urlNoticia.value
                 ocultarDialog('dialogo-URL')
                 postNoticia(urlNoticia)
            }else {
                alert('Você precisa se logar para postar notícias')
                ocultarDialog('dialogo-URL')
            }
        }
    })
}


function postNoticia(urlNoticia, titu) {
    axios.post('/postarNoticia',
        { url: urlNoticia})
        .then(res => {
            console.log(res)
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

    console.log("Inicializar chamou o append, URL: "+url)
    const noticia = document.createElement('div')
    const conteudoNoticia = obtemHTMLNoticia(url, noticia)
    noticia.classList.add('noticia')
    //adicionarVotos()
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


async function gerarPreview(html, divDaNoticia, url) {
    const htmlDaNoticia = document.getElementById("html-externo")
    /*Preciso colocar o html da noticia dentro do meu html pra adicionar e navegar por ele pela DOM*/
    htmlDaNoticia.innerHTML = html
    const titulo = obtemConteudoMeta(htmlDaNoticia, '[property="og:title"]')
    const descricao = obtemConteudoMeta(htmlDaNoticia, '[property="og:description"]')
    const imagem = obtemConteudoMeta(htmlDaNoticia, '[property="og:image"]')

    //AQUI TEM Q TER UM POST PRA BUSCAR E RENDERIZAR PS VOTOS NEGATIVOS
    divDaNoticia.setAttribute('url', url)
    console.log("URL antes de acrescentar votos: "+url)
    const divVotos = await acrescentaOsVotos(url)
    divVotos.classList.add('divVotos')
    console.log('Div votos' +divVotos)
    /*Coloca o conteudo do preview dentro de uma div de notícia*/
    appendConteudo(divDaNoticia, titulo, 'label')
    appendConteudo(divDaNoticia, descricao, 'div')
    divDaNoticia.appendChild(divVotos)
    appendConteudo(divDaNoticia, imagem, 'img')
    tornarClicavel(htmlDaNoticia, divDaNoticia)
}

async function acrescentaOsVotos(url){
    const votoPositivo = document.createElement('p')
    const votoNegativo = document.createElement('p')
    votoNegativo.innerHTML = 'Falsa'
    votoPositivo.innerHTML = 'Verdadeira'
    votoPositivo.classList.add('votoPositivo')
    votoNegativo.classList.add('votoNegativo')

    const quantVotosPos = document.createElement('p')
    const quantVotosNeg = document.createElement('p')
    const objetoNoticia = await buscaQuantVotos(url)
    quantVotosPos.innerHTML = objetoNoticia.positivos
    quantVotosNeg.innerHTML = objetoNoticia.negativos
    quantVotosPos.classList.add('num-votos-pos')
    quantVotosNeg.classList.add('num-votos-neg')

    divVotos = document.createElement('div')
    divVotos.appendChild(votoPositivo)
    divVotos.appendChild(quantVotosPos)
    divVotos.appendChild(votoNegativo)
    divVotos.appendChild(quantVotosNeg)
    
    votar(votoPositivo, quantVotosPos, votoNegativo, quantVotosNeg, url)

    return divVotos
}

async function buscaQuantVotos(urli){
    console.log("URL indo pro back-end "+urli)
  return await axios.get('/buscarNoticia', 
                 {url: urli}
                ).then(res => {
                      return res.data
                }).catch(err => {
                    console.log("Erro na requisição de votos ao servidor: "+err)
                })
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


