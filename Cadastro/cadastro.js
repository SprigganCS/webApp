document.getElementById('cadastrar').onclick = function() {
  	const cpf = document.getElementById("cpf_paciente").value;
	const nome = document.getElementById("nome_paciente").value;
	const rg = document.getElementById("rg_paciente").value;
  	const nasc = document.getElementById("data_nascimento").value; //ja vem tratada
	const sexo = document.getElementById("sexo_paciente").value;
	const telefone = document.getElementById("telefone_paciente").value;

	let select = document.getElementById('convenio');
	var convenio = select.options[select.selectedIndex].value;

	console.log(nome);
	console.log(cpf);
	console.log(rg);
	console.log(nasc);
	console.log(sexo);
	console.log(telefone);
	console.log(convenio);

	
	
	var dados;
	var inutil=null;

	//ENVIAR DADOS DO CADASTRO PARA O BANCO DE DADOS
	fetch('http://localhost:5000/insert', {
		headers: {
			'Content-type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({nome, cpf, rg, nasc, sexo, telefone, convenio, inutil : dados}) //converter nome para id do convenio
	})
	.then(response => response.json())
	.then(data => insertRowIntoTable(data['data'])); 
	//REJEITAR CADSATRO SE HOUVER CADASTRO DE MESMO CPF?

	
}



