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
            console.log(insertId);
            //return response;

        } catch (error){
            console.log(error);
        }

    } 
}

module.exports = DbService;








