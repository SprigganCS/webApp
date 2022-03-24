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






//update




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