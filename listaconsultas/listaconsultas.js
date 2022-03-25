let selecao = document.getElementById("selecionar-btn")

selecao.addEventListener('click', function (){
	let criterio = document.querySelector('input[name="dados_paciente"]:checked').value;
    console.log(criterio);
})