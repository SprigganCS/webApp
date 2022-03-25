let selecao = document.getElementById("selecionar-btn")

selecao.addEventListener('click', function (){
    let barra =document.querySelector('#barra-pesquisa'); //aparece a barra de pesquisa
    if(document.querySelector('input[name="criterio_consulta"]:checked').value.lenght != 0){ //só mostra a barra se uma opção é selecionada
        barra.hidden=false;
    }
    document.getElementById("table").deleteRow(0);
});

let consultar = document.getElementById("consultar-btn");
consultar.addEventListener('click', function (){
    let entrada = document.getElementById("entrada");


    
    fetch('http://localhost:5000/procura/'+ entrada.value)
    .then(response => response.json())
    .then(result => mostraResultado(result['data']));
})

function mostraResultado (data){
    console.log(data);
    const table = document.querySelector('table tbody');
    const newRow = table.insertRow();
    if(data.length == 0){
        newRow.innerHTML="Sem resultados";
        console.log("sem resultados")
    }
    else{
        newRow.innerHTML=("--Dados do paciente--");
        newRow.innerHTML="<b>Nome do(a) paciente: </b>"+ data[0].nome_paciente+ "<b> CPF: </b>"+ data[0].cpf_paciente+ "<b> RG:</b> "+data[0].rg_paciente+"<b> Nascimento: </b>"+data[0].nasc_paciente.substring(0,10) + "<b> Sexo:</b> "+data[0].sexo_paciente+"<b> Telefone: </b>"+data[0].telefone_paciente;

        fetch('http://localhost:5000/consulta/'+ data[0].cpf_paciente)
        .then(response => response.json())
        .then(result => printaConsulta(result['data']));
    }
}

function printaConsulta(data){
    console.log(data);

    if(data.length === 0){
        table.innerHTML = "<tr><td class='no-data' colspan='8'>Sem dados</td></tr>";
        return;
    }

    const table = document.querySelector('table tbody');
    const newRow = table.insertRow();
    
    let tableHtml = "<tr>";
    for(let i=0; i<data.length; i++){
        tableHtml += "<td>"+data[i].data_consulta+"</td>";
        newRow.innerHTML="<br></br>"
    }
    tableHtml += "</tr>";
    newRow.innerHTML=tableHtml;
}




