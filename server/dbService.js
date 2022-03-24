const mysql = require('mysql');
const dotenv = require ('dotenv');
const { NULL } = require('mysql/lib/protocol/constants/types');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err){
        console.log(err.message);
    }
    console.log('db ' + connection.state);
})


class DbService {
    static getDbServiceInstance(){
        return instance ? instance: new DbService();
    }
    async getAllData(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM tbl_paciente;";

                connection.query(query, (err, results) =>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            //console.log(response);
            return response;

        } catch(error){
            console.log(error);
        }
    }

    async insertNewName(dados){ 
        try{
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO tbl_paciente (cpf_paciente, nome_paciente, rg_paciente, nasc_paciente, sexo_paciente, telefone_paciente, id_convenio) VALUES (?, ?, ?, ?, ?, ?, ?)";
                let auxiliar = dados;
                let aux = JSON.parse(JSON.stringify(auxiliar)); //objeto completo

                var convenio=aux.convenio;
                if(convenio == "Não tem convênio") convenio=null;
                if(convenio == "Unimed") convenio="1";
                if(convenio == "AMO") convenio="2";
                if(convenio == "UNIÃO") convenio="3";
                if(convenio == "São Francisco") convenio="4";
                
                let data = [ [aux.cpf], [aux.nome], [aux.rg], [aux.nasc], [aux.sexo], [aux.telefone], [convenio]];  
                
                console.log(data);
    
                connection.query(query, data, (err, result) =>{
                        if (err) reject(new Error(err.message));
                        resolve(result.insertId);
                })
            });
            //console.log(JSON.parse(JSON.stringify(dados)).cpf);
            return dados;
            

        } catch (error){
            console.log(error);
        }

    } 


    async agendaConsulta(dados){
        try{
            const insertId = await new Promise((resolve, reject) => {
                var auxiliar = dados;
                var aux = JSON.parse(JSON.stringify(auxiliar));
                var achaid = "SELECT id_medico FROM tbl_medico WHERE nome_medico=";
                var nome_query = "'"+aux.medico+"';";
                achaid = achaid+nome_query;
                var id;
                connection.query(achaid, (err, result) =>{
                    if(err) reject(new Error(err.message));
                    id=result;
                    id=JSON.stringify(id).replace(/\D/g, ''); //o retorno padrão da consulta é [ RowDataPacket { id_medico: 1 } ], o método replace limpa tudo deixando apenas o valor numerico do id
                    
                    var achaCpf="SELECT cpf_paciente FROM tbl_paciente WHERE nome_paciente=";
                    var nome_achaCpf="'"+aux.paciente+"';";
                    achaCpf= achaCpf+nome_achaCpf;
                    var cpf_achado;
                    connection.query(achaCpf, (err, result)=>{
                        if(err) reject(new Error(err.message));
                        cpf_achado=JSON.stringify(result).replace(/\D/g, '');
                        
                        var insercao = "INSERT INTO tbl_consulta (id_medico, cpf_paciente, data_consulta) VALUES (?, ?, ?)"
                        var dados_insercao=[ [id], [cpf_achado], [aux.data] ];
                        // console.log(dados_insercao); // ULTIMA VERIFICAÇÃO ANTES DE INSERIR
                        connection.query(insercao, dados_insercao, (err, result) =>{
                            if(err) reject (new Error(err.message));
                            console.log("Consulta agendada");
                            resolve(result.insertId);
                        })
                    })
                })
            });
            return dados;
        }catch(error){
            console.log(error);
        }


    }

    async adicionaMedico (dados){
        try{
            const insertId = await new Promise((resolve, reject) => {
                var auxiliar = dados;
                var aux = JSON.parse(JSON.stringify(auxiliar));
                let query = "INSERT INTO tbl_medico (nome_medico, especializacao_medico, crm_medico) VALUES (?, ?, ?);"
                let data = [ [aux.nome], [aux.especializacao], [aux.crm] ];

                connection.query(query, data, (err, result) =>{
                    if(err) reject (new Error(err.message));
                    resolve(result.insertId);
                    console.log("Medico adicionado");
                })
            });
            return dados;

        }catch(error){
            console.log(error);
        }
    }
    

}

module.exports = DbService;








