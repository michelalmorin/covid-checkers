function votar(votoPositivo, quantVotosPos, votoNegativo, quantVotosNeg, url){
    document.addEventListener('DOMContentLoaded', ()=>{
        cliqueVoto(votoPositivo, quantVotosPos, votoNegativo, quantVotosNeg, url)
    })
}

function cliqueVoto(votoPositivo, quantVotosPos, votoNegativo, quantVotosNeg, url){
    votoPositivo.onclick = (e) =>{
        e.preventDefault()
        enviaVotosBd('positivos', quantVotosPos, url)
    }

    votoNegativo.onclick = (e) =>{
        e.preventDefault()
        enviaVotosBd('negativos', quantVotosNeg, url)
    }
}

function enviaVotosBd(tipo, quantiaElement, url){
    axios.post('/registrarVoto', 
        {tipo: tipo, url: url}
    ).then(res => {
        renderizarVotos(tipo, res.data, quantiaElement)
    }).catch(err => {
        alert('Não foi possível registrar voto1')
        console.log('Não foi possível registrar voto '+err)
    }) 
}

function renderizarVotos(tipo, quantAtualizada, quantiaElement){
    quantiaElement.innerHTML = quantAtualizada
}