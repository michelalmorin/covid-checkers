function configurarBusca(){
    document.addEventListener("DOMContentLoaded", function(){
        const formBusca = document.getElementById("form-busca")
        formBusca.onsubmit(e=>{
            e.preventDefault()
            obtemNoticias(inputDaPesquisa) //COLOCAR AQUI IMPUT DE PESQUISA
            /*ESTA FUNÇÃO ESTÁ INCOMPLETA*/
        })  
    })
}

function obtemNoticias(parametro){
    const noticias = document.querySelectorAll(".noticia")
    noticias.forEach(noticia => {
        if(noticia.getAttribute("titulo").includes(parametro)) poeNoResultBusca(noticia)
    })
}

function poeNoResultBusca(noticia){
/*...*/
}

configurarBusca()