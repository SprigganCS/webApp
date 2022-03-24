document.addEventListener('DOMContentLoaded', function (){
	fetch('http://localhost:5000/getAll')
	.then(response => response.json())
	.then(data => loadHTMLTable(data['data']));
})


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
        tableHtml += `<td><button class="deleta-linha-btn">Editar</td>`;
        tableHtml += `<td><button class="edita-linha-btn">Deletar</td>`
        tableHtml += "</tr>";
    });
    table.innerHTML = tableHtml;
}