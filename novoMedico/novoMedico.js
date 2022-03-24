document.getElementById('cadastro_novo_medico').onclick = function() {
  const nome = document.getElementById("nome_medico").value;
	const especializacao = document.getElementById("especializacao_medico").value;
	const crm = document.getElementById("crm_medico").value;

	console.log(nome);
	console.log(especializacao);
	console.log(crm);

	window.close();//fazer verifição antes de fechar
	//ENVIAR AS VARIAVEIS PRINTADAS NO CONSOLE PARA O BANCO DE DADOS
	//ACREDITO QUE JÁ ESTEJAM TRATADAS
}