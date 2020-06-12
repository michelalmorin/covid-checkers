function configurarBusca() {
;    document.addEventListener("DOMContentLoaded", function () {
        const formBusca = document.busca
        formBusca.onsubmit = e => {
            e.preventDefault()
            buscaNoticias(e.target.entrada)
        }
    })
}


function buscaNoticias(inputDaPesquisa) {
    axios.get('/buscar', {
        params: {
            chaveDeBusca: inputDaPesquisa
        }
    })
    .then(resp => {
        popularFeed(resp.data)
        }).catch(error => {
            console.log("ERRO AO CARREGAR RESULTADO DA BUSCA: ", error)
        })
      

    // const noticias = Array.from(document.getElementsByClassName('noticia'))
    // let noticiasFiltradas = []
    // noticiasFiltradas = noticias.filter(noticia => {
    //     const titulo = noticia.firstElementChild.textContent
    //     return titulo.includes(inputDaPesquisa.value)
    // })

    // mostraResultadoBusca(noticiasFiltradas)
}


// function mostraResultadoBusca(noticiasFiltradas) {
//     const feed = document.getElementById('feed')
//     feed.innerHTML = ''
//     noticiasFiltradas.forEach(noticia => {
//         feed.appendChild(noticia)
//     })
// }


configurarBusca()