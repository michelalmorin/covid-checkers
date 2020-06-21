function inicializar(bancoDeDados){
    document.addEventListener("DOMContentLoaded", function(){
        inicializarDialogs()
        buscarNoticiasNoBd()
        verificarSessaoAtiva()
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


function irHome(){
    document.addEventListener('DOMContentLoaded', function(){
         const botaoHome = document.getElementById('home')
         console.log(botaoHome)
         botaoHome.onclick = function() {
             buscarNoticiasNoBd()
         }
    })
    
}

function inicializarDialogs(){
    const dialogs = document.querySelectorAll('dialog')
    Array.from(dialogs).map((d) => {
      dialogPolyfill.registerDialog(d);
    })
}

function verificarSessaoAtiva(){
    const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'))
    if (usuarioLogado != null){
        mostraLogado(usuarioLogado._id,
            usuarioLogado.nome, usuarioLogado.sobrenome)
    }
}


irHome()
inicializar()



