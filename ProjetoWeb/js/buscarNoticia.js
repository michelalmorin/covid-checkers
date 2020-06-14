function configurarBusca() {
;    document.addEventListener("DOMContentLoaded", function () {
        const formBusca = document.busca
        formBusca.onsubmit = e => {
            e.preventDefault()
            if(e.target.entrada == ``) inicializar()
            else buscaNoticias(e.target.entrada)
        }
    })
}


function buscaNoticias(inputDaPesquisa) {
   
    axios.get('/buscar', {
        params: {
            chaveDeBusca: inputDaPesquisa.value
        }
    })
    .then(resp => {
        console.log("Voltando da requisicao")
        console.log("Resultado da busca chegando no frotn end"+resp.data)
        mostrarResultBusca(resp.data)
        }).catch(error => {
            console.log("ERRO AO CARREGAR RESULTADO DA BUSCA: ", error)
        })
      
}

function mostrarResultBusca(noticias){
    document.getElementById(`feed`).innerHTML = ``
    for (let i of noticias[0]){
        //console.log("Noticia.url "+Object.keys(noticias[0]))
    }
    noticias[0].forEach(noticia => {
        console.log("Noticias no popular feed? "+noticia.url)
        //é feita a colocação dessa forma, enviando para o servidor, para gerar o preview
        appendNoticia(noticia.url)
    })
}

configurarBusca()