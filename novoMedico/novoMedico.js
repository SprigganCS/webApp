document.getElementById('cadastro_novo_medico').onclick = function() {
  const nome = document.getElementById("nome_medico").value;
	const especializacao = document.getElementById("especializacao_medico").value;
	const crm = document.getElementById("crm_medico").value;

	console.log(nome);
	console.log(especializacao);
	console.log(crm);


	//ENVIAR DADOS DO CADASTRO PARA O BANCO DE DADOS
	var dados;
	fetch('http://localhost:5000/novoMedico', {
		headers: {
			'Content-type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({nome, especializacao, crm, null : dados}) //converter nome para id do convenio
	})
	.then(response => response.json())
	.then(data => insertRowIntoTable(data['data'])); 

	//window.close();//fazer verifição antes de fechar
	//ENVIAR AS VARIAVEIS PRINTADAS NO CONSOLE PARA O BANCO DE DADOS
	//ACREDITO QUE JÁ ESTEJAM TRATADAS
}