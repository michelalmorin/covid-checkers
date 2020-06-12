function inicializar(bancoDeDados){
    document.addEventListener("DOMContentLoaded", function(){
        buscarNoticiasNoBd()
    })
}

function buscarNoticiasNoBd(){
    axios.get('/inicializar')
    .then(resp => {
        popularFeed(resp.data)
        console.log(resp.data)
        }).catch(error => {
            console.log("ERRO AO CARREGAR NOTICIAS: ", error)
        })
      
}

function popularFeed(noticias){
    noticias.forEach(noticia => {
        //é feita a colocação dessa forma, enviando para o servidor, para gerar o preview
        postNoticia(noticia.url)
    })
}
// document.addEventListener('load', () =>{
//     console.log('testeu')
//     teste()
// })


inicializar()