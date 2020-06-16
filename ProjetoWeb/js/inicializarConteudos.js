function inicializar(bancoDeDados){
    document.addEventListener("DOMContentLoaded", function(){
        buscarNoticiasNoBd()
    })
}

function buscarNoticiasNoBd(){
    axios.get('/inicializar')
    .then(resp => {
        popularFeed(resp.data)
        }).catch(error => {
            console.log("ERRO AO CARREGAR NOTICIAS: ", error)
        })
      
}

function popularFeed(noticias){

    noticias.forEach(noticia => {
        //é feita a colocação dessa forma, enviando para o servidor, para gerar o preview
        appendNoticia(noticia.url)
    })
}
// document.addEventListener('load', () =>{
//     console.log('testeu')
//     teste()
// })

function irHome(){
    document.addEventListener('DOMContentLoaded', function(){
    
         const botaoHome = document.getElementById('home')
         console.log(botaoHome)
         botaoHome.onclick = function() {
             console.log("Cliccou no home")
             buscarNoticiasNoBd()
         }
    })
    
}

irHome()
inicializar()


