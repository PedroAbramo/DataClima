var database = require("../database/config");

function buscarUltimosRegistros(idSala, limite_linhas) {

    var instrucaoSql = `SELECT 
        temperatura, 
        umidade,
                        momento,
                        DATE_FORMAT(dataRegistro,'%H:%i:%s') as momento_grafico
                    FROM registro
                    WHERE fkSala = ${idSala}
                    ORDER BY id DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRegistrosEmTempoReal(idSala) {

    var instrucaoSql = `SELECT 
        temperatura, 
        umidade,
                        DATE_FORMAT(dataRegistro,'%H:%i:%s') as momento_grafico, 
                        fkSensor 
                        FROM registro WHERE fkSala = ${idSala} 
                    ORDER BY id DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function ultimaAtualizacao(){
    var instrucao = `
    select dataRegistro from registro
    order by dataregistro desc limit 1;
`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function TemperaturaUmidadeMAXMIN(idSala){
    var instrucao = `
    select
    (SELECT temperatura FROM registro WHERE DATE(dataRegistro) = CURDATE() and fkSensor = ${idSala} ORDER BY temperatura DESC LIMIT 1) AS temperaturaMax,
    (SELECT umidade FROM registro WHERE DATE(dataRegistro) = CURDATE() and fkSensor = ${idSala} ORDER BY umidade DESC LIMIT 1) AS umidadeMax,
    -- Mínimos
    (SELECT temperatura FROM registro WHERE DATE(dataRegistro) = CURDATE() and fkSensor = ${idSala} ORDER BY temperatura ASC LIMIT 1) AS temperaturaMin,
    (SELECT umidade FROM registro WHERE DATE(dataRegistro) = CURDATE() and fkSensor = ${idSala} ORDER BY umidade ASC LIMIT 1) AS UmidadeMin;
    

`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
module.exports = {
    buscarUltimosRegistros,
    buscarRegistrosEmTempoReal,
    ultimaAtualizacao,
    TemperaturaUmidadeMAXMIN
}