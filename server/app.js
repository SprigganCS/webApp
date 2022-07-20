const express = require('express');
const app = express();
const cors = require('cors') ;
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))



//CRIAÇÃO
app.post('/insert', (request, response) =>{
	const dados = request.body;
	const db = dbService.getDbServiceInstance();
	
	const result= db.insertNewName(dados);

	result
	.then(data => response.json({ data : data }))
	.catch(err => console.log(err));
});

app.post('/agendar', (request, response) =>{ //aparentemente post é um método padrão
	const dados = request.body;
	const db = dbService.getDbServiceInstance();
	const result= db.agendaConsulta(dados);

	result
	.then(data => response.json({ data : data }))
	.catch(err => console.log(err));
});

app.post('/novoMedico', (request, response) =>{ 
	const dados = request.body;
	const db = dbService.getDbServiceInstance();
	const result= db.adicionaMedico(dados);

	result
	.then(data => response.json({ data : data }))
	.catch(err => console.log(err));
});



//LEITURA
app.get('/getAll', (request, response) => {
	const db = dbService.getDbServiceInstance();

	const result = db.getAllData();
	result
	.then(data => response.json({data : data}))
	.catch(err => console.log(err));
})

app.get('/procura/:nome', (request, response) => { //procura paciente pelo nome
	const {nome} = request.params;
	const db = dbService.getDbServiceInstance();

	const result = db.procuraNome(nome);
	result
	.then(data => response.json({data : data}))
	.catch(err => console.log(err));
})

app.get('/consulta/:cpf', (request, response) => { //procura consulta pelo cpf
	const {cpf} = request.params;
	const db = dbService.getDbServiceInstance();

	const result = db.procuraConsulta(cpf);
	result
	.then(data => response.json({data : data}))
	.catch(err => console.log(err));
})







//UPDATE
app.patch('/update/paciente', (request, response) => {
	const {id, name, rg, nasc, sexo, telefone, convenio} = request.body;
	const db = dbService.getDbServiceInstance();
	if(name.length != 0){
		const result = db.updateNameById(id, name);

		result
		.then(data => response.json({success : data}))
		.catch(err => console.log(err));
	}

	if(rg.length != 0){
		const result = db.updateRgById(id, rg);

		result
		.then(data => response.json({success : data}))
		.catch(err => console.log(err));
	}

	if(nasc.length != 0){
		const result = db.updateNascById(id, nasc);
		result
		.then(data => response.json({success : data}))
		.catch(err => console.log(err));
	}
	if(sexo.length != 0){
		const result = db.updateSexoById(id, sexo);
		result
		.then(data => response.json({success : data}))
		.catch(err => console.log(err));
	}
	if(telefone.length != 0){
		const result = db.updateTelefoneById(id, telefone);
		result
		.then(data => response.json({success : data}))
		.catch(err => console.log(err));
	}
	if(convenio.length != 0){
		const result = db.updateConvenioById(id, convenio);
		result
		.then(data => response.json({success : data}))
		.catch(err => console.log(err));
	}
	 
})



//REMOÇÃO/DELETAR
app.delete('/delete/:id', (request, response) => {
	const { id } = request.params;
	const db = dbService.getDbServiceInstance();

	const result = db.deletaPacientePorCPF(id);

	result
	.then(data => response.json({success : data}))
	.catch(err => console.log(err));

});






app.listen(process.env.PORT, () => console.log('app is running'));