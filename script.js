var agenda = document.getElementById("agenda");

agenda.addEventListener('click', function (){
	window.open("agendamento/agendamento.html", "janela nova", 'width=500, height=200, resizable=yes, top=100, left=100, menubar=yes, toolbar=yes, scrollbars=yes');
})

var cadastrar = document.getElementById("cadastrar");

cadastrar.addEventListener('click', function (){
	window.open("Cadastro/cadastro.html", "janela nova", 'width=700, height=900, resizable=yes, top=100, left=100, menubar=yes, toolbar=yes, scrollbars=yes');
})

var lista = document.getElementById("lista");

lista.addEventListener('click', function (){
	window.open("lista/lista.html", "janela nova", 'width=1500, height=900, resizable=yes, top=100, left=100, menubar=yes, toolbar=yes, scrollbars=yes');
})

var consultas = document.getElementById("consultas");
consultas.addEventListener('click', function (){
	window.open("listaconsultas/listaconsultas.html", "janela nova", 'width=1500, height=900, resizable=yes, top=100, left=100, menubar=yes, toolbar=yes, scrollbars=yes');
})

