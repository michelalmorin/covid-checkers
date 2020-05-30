function configurarBusca() {
    document.addEventListener("DOMContentLoaded", function () {
        const formBusca = document.busca
        formBusca.onsubmit = e => {
            e.preventDefault()
            obtemNoticias(e.target.entrada) //COLOCAR AQUI IMPUT DE PESQUISAs
            /*ESTA FUNÇÃO ESTÁ INCOMPLETA*/
        }
    })
}

function obtemNoticias(inputDaPesquisa) {
    const noticias = Array.from(document.getElementsByClassName('noticia'))
    let noticiasFiltradas = []
    noticiasFiltradas = noticias.filter(noticia => {
        const titulo = noticia.firstElementChild.textContent
        console.log(titulo)
        return titulo.includes(inputDaPesquisa)
    })
    /*Como inserir as divs resultantes da busca uma por uma?*/ 
    document.getElementById('feed').innerHTML = noticiasFiltradas.values
}

function poeNoResultBusca(noticia) {
    /*...*/
}

configurarBusca()