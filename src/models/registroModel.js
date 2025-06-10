var database = require("../database/config");

function ultimaAtualizacao() {
    var instrucao = `
    select dataRegistro from registro
    order by dataregistro desc limit 1;
`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function TemperaturaUmidadeMAXMIN(idSala) {
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

function exibirValoresDaSala(datacenterId) {

    var instrucao = `
select s.id,
s.fkDatacenter,
s.nome as sala,
(select temperatura from registro where fkSensor = se.fkSala order by dataRegistro
desc limit 1) as ulttemperatura,
(select umidade from registro where fkSensor = se.fkSala order by dataRegistro
desc limit 1) as ultumidade,
(select dataRegistro from registro where fkSensor = se.fkSala order by dataRegistro desc limit 1) as data
from sala s
inner join
sensor se on s.id = se.fkSala
where fkDatacenter = ${datacenterId};
    `;
    return database.executar(instrucao);
}

module.exports = {
    buscarRegistrosSala,
    ultimaAtualizacao,
    TemperaturaUmidadeMAXMIN,
    exibirValoresDaSala
}