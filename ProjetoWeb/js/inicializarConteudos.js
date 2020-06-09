function inicializar(bancoDeDados){
    document.addEventListener("DOMContentLoaded", function(){
        buscarNoticiasNoBd()
    })
}

function buscarNoticiasNoBd(){
    axios.get('/inicializar')
    .then(resp => {
        console.log(resp)
        }).catch(error => {
            console.log("ERRO AO CARREGAR NOTICIAS", error)
        })
      
}

// document.addEventListener('load', () =>{
//     console.log('testeu')
//     teste()
// })


inicializar()