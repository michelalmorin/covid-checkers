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
        mostrarResultBusca(resp.data)
        }).catch(error => {
            console.log("ERRO AO CARREGAR RESULTADO DA BUSCA: ", error)
        })
      
}

function mostrarResultBusca(noticias){
    document.getElementById(`feed`).innerHTML = ``

    noticias[0].forEach(noticia => {
        //é feita a colocação dessa forma, enviando para o servidor, para gerar o preview
        appendNoticia(noticia.url)
    })
}

configurarBusca()