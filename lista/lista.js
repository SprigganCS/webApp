document.addEventListener('DOMContentLoaded', function (){
	fetch('http://localhost:5000/getAll')
	.then(response => response.json())
	.then(data => loadHTMLTable(data['data']));
})

document.querySelector('table tbody').addEventListener('click', function(event){ //deleta linhas direto no banco de dados
    if(event.target.className === "deleta-linha-btn"){
        deletaPacientePorCPF(event.target.dataset.id) //manda o id dos botões (que no caso é o identificador CPF)
    }
    if(event.target.className === "edita-linha-btn"){
        handleEditRow(event.target.dataset.id)
    }
});

const updateBtn = document.querySelector('#update-row-btn');

function deletaPacientePorCPF(id)  {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
	.then(data => {
        if(data.success){
            location.reload();
        }
    });
}

function handleEditRow(id){
    const updateSection = document.querySelector('#update-row');
    const opcoesUpdate = document.querySelector("#painel_opcoes");
    updateSection.hidden = false;

    document.querySelector('#update-row-btn').dataset.id = id;
}

updateBtn.onclick = function (){
    const updateNameInput = document.querySelector('#update-name-input');
    const updateRGInput = document.querySelector('#update-rg-input');
    const updateNascInput = document.querySelector("#update-nasc-input");
    const updateSexoInput = document.querySelector("#update-sexo-input");
    const updateTelefoneInput = document.querySelector("#update-telefone-input")
    const updateConvenioInput = document.querySelector("#update-convenio-input");

    fetch('http://localhost:5000/update/paciente', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: document.querySelector('#update-row-btn').dataset.id,
            name: updateNameInput.value,
            rg: updateRGInput.value,
            nasc: updateNascInput.value,
            sexo: updateSexoInput.value,
            telefone: updateTelefoneInput.value,
            convenio: updateConvenioInput.value
        })
    })  
    .then(response => response.json())
    .then(data => {
        if(data.success){
            location.reload();
        }
    })
}




function insertRowIntoTable(data){
    const table = document.querySelector('table tbody');
    const isTableData= table.querySelector('.no-data');

    let tableHtml = "<tr>";
    data.forEach(function ({nome_paciente, cpf_paciente, rg_paciente, nasc_paciente, sexo_paciente, id_convenio, telefone_paciente}){
        tableHtml += `<td>${cpf_paciente}</td>`;
        tableHtml += `<td>${nome_paciente}</td>`;
        tableHtml += `<td>${rg_paciente}</td>`;
        tableHtml += `<td>${new Date(nasc_paciente).toLocaleDateString()}</td>`;
        tableHtml += `<td>${sexo_paciente}</td>`;
        tableHtml += `<td>${telefone_paciente}</td>`;
        tableHtml += `<td>${id_convenio}</td>`;
        tableHtml += `<td><button class="edita-linha-btn" data-id=${cpf_paciente}>Editar</td>`;
        tableHtml += `<td><button class="deleta-linha-btn" data-id=${cpf_paciente}>Deletar</td>`;
    });
    tableHtml += "</tr>";
    if (isTableData){
        table.innerHTML = tableHtml;
    }else {
        const newRow = table.insertRow();
        newRow.innerHTML=tableHtml;
    }
}


function loadHTMLTable(data){
    const table = document.querySelector('table tbody');
    
    console.log(data);

    if(data.length === 0){
        table.innerHTML = "<tr><td class='no-data' colspan='8'>Sem dados</td></tr>";
        return;
    }

    let tableHtml = "";
    data.forEach(function({nome_paciente, cpf_paciente, rg_paciente, nasc_paciente, sexo_paciente, id_convenio, telefone_paciente}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${cpf_paciente}</td>`;
        tableHtml += `<td>${nome_paciente}</td>`;
        tableHtml += `<td>${rg_paciente}</td>`;
        tableHtml += `<td>${new Date(nasc_paciente).toLocaleDateString()}</td>`;
        tableHtml += `<td>${sexo_paciente}</td>`;
        tableHtml += `<td>${telefone_paciente}</td>`;
        tableHtml += `<td>${id_convenio}</td>`;
        tableHtml += `<td><button class="edita-linha-btn" data-id=${cpf_paciente}>Editar</td>`;
        tableHtml += `<td><button class="deleta-linha-btn" data-id=${cpf_paciente}>Deletar</td>`;
        tableHtml += "</tr>";
    });
    table.innerHTML = tableHtml;
}

