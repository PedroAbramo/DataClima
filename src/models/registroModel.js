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

module.exports = {
    buscarUltimosRegistros,
    buscarRegistrosEmTempoReal
}