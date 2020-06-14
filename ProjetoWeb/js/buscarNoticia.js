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
            chaveDeBusca: inputDaPesquisa.value
        }
    })
    .then(resp => {
        console.log("Resultado da busca chegando no frotn end"+Object.keys(resp.data))
        popularFeed(resp.data)
        }).catch(error => {
            console.log("ERRO AO CARREGAR RESULTADO DA BUSCA: ", error)
        })
      
}


configurarBusca()