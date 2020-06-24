
function votar(votoPositivo, quantVotosPos, votoNegativo, quantVotosNeg, url){
    processarVoto(votoPositivo, 'positivos', quantVotosPos, url)
    processarVoto(votoNegativo, 'negativos', quantVotosNeg, url)

}


function processarVoto(elemento, tipo, quantVotos, url){
    elemento.onmouseover = () => {
        elemento.style.cursor = 'pointer'
    }

    elemento.onclick = (e) => {
        console.log('Clicou pra votar: '+tipo)
        e.preventDefault()
        enviaVotosBd(tipo, quantVotos, url)
    }
}


function enviaVotosBd(tipo, quantiaElement, url){

    axios.post('/registrarVoto', 
        {tipo: tipo, url: url}
    ).then(res => {
         quantAtualizada = res.data[`${tipo}`]
        renderizarVotos(tipo, quantAtualizada, quantiaElement)
    }).catch(err => {
        alert('Não foi possível registrar voto1')
        console.log('Não foi possível registrar voto '+err)
    }) 
}

function renderizarVotos(tipo, quantAtualizada, quantiaElement){
    quantiaElement.innerHTML = quantAtualizada
}