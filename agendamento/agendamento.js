document.getElementById('agendar').onclick = function() {
	const medico = document.getElementById("medico_agendamento").value;
	const paciente = document.getElementById("paciente_agendamento").value;
	const temp = document.getElementById("data_agendamento").value;
  
  
	//tratamento de data: formato original "2022-03-24T02:06" -> "2022-03-24 02:06:00"
	//adição de segundos na propria linha getElementById
  
	let data = temp;
	data=data.replace('T',' ');
	  
	console.log(medico);
	console.log(paciente);
	console.log(data);


	//ENVIAR DADOS DO CADASTRO PARA O BANCO DE DADOS
	var dados;
	fetch('http://localhost:5000/agendar', {
		headers: {
			'Content-type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({medico, paciente, data, null : dados})
	})
	.then(response => response.json())
	.then(data => insertRowIntoTable(data['data'])); 















	
	//acharid(medico);










	/*
	//QUERY ENCONTRAR ID DO MÉDICO PELO NOME 
	var pegaid = "SELECT id_medico FROM tbl_medico WHERE nome_medico='"+ medico + "'" ;

	var res;
	connection.query(pegaid, (erro, resposta)=>{ //query para conseguir id do médico pelo nome -> res
		if(resposta){
			res=JSON.stringify(resposta);
			res=res.replace(/\D/g, '');
			console.log(res); //daqui sai o ID do médico (achado pelo nome dado pelo usuario na aplicação web)
		}
		else{
			console.log("erro na consulta");
		}
	})*/

	//ENVIAR DADOS DO AGENDAMENTO PARA O BANCO DE DADOS
	/*var inserir = "INSERT INTO tbl_consulta (id_medico, cpf paciente, data_consulta) VALUES ?";  
	var values = [ 	 [pegaid], [cpf_paciente], [data_consulta] ];  
	console.log(inserir, [values]);

	connection.query(inserir, [values], function (err, result) {  //envia para o banco de dados
		if (err) throw err;
		console.log("Numero de inserções: " + result.affectedRows);  
	});  */
		
	
	//REJEITAR AGENDAMENTO SE NÃO TIVER NOME DO PACIENTE CADASTRADO
	//rejeitar horarios conflitantes? isso vai ser difícil
	
	//window.close(); //adicionar mensagem para feedback pro usuario (sucesso ou falha)
}

