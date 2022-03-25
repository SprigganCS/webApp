let selecao = document.getElementById("selecionar-btn")

selecao.addEventListener('click', function (){
    let barra =document.querySelector('#barra-pesquisa'); //aparece a barra de pesquisa
    barra.hidden=false;
});

let consultar = document.getElementById("consultar-btn");
consultar.addEventListener('click', function (){
    let entrada = document.getElementById("entrada");
    console.log(entrada.value);
    let opcao = document.querySelector('input[name="criterio_consulta"]:checked').value;
    console.log(opcao);

    fetch
})




