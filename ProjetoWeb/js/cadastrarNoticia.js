/*Trata a submissão de url de notícia pelo usuário, enviado ao back-end*/
const formCadastroNoticia = document.cadastrarNoticia

formCadastroNoticia.onsubmit = axios.post(formCadastroNoticia.cadastrarNoticia,
    { url: document.formCadastroNoticia.urlNoticia.value }
        .then(resp => {
            appendNoticia(resp)
        })
)

function appendNoticia(resp) {
    const noticia = document.createElement('div')
    noticia.innerHTML = resp.conteudoNoticia
    noticia.classList.add('noticia')
    const feed = document.getElementById('feed')
    feed.insertAdjacentElement('afterbegin', noticia)
}