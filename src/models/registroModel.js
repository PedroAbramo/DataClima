var database = require("../database/config");

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


function buscarRegistrosSala(idSala) {
  var instrucaoSql = `SELECT temperatura, umidade, dataRegistro 
  FROM registro WHERE fkSensor = ${idSala} 
  ORDER BY dataRegistro DESC 
  LIMIT 10;`

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
    buscarRegistrosSala,
    ultimaAtualizacao,
    TemperaturaUmidadeMAXMIN
}