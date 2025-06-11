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
    SELECT
    (SELECT max(temperatura) FROM registro WHERE DATE(dataRegistro) = CURDATE() AND fkSensor = ${idSala}) AS temperaturaMax,
    (SELECT dataRegistro FROM registro WHERE fkSensor = ${idSala} AND temperatura = temperaturaMax ORDER BY dataRegistro desc limit 1) AS dataTempMax,
    (SELECT max(umidade) FROM registro WHERE DATE(dataRegistro) = CURDATE() AND fkSensor = ${idSala}) AS umidadeMax,
    (SELECT dataRegistro FROM registro WHERE fkSensor = ${idSala} AND umidade = umidadeMax ORDER BY dataRegistro desc limit 1) AS dataUmiMax,
    -- Valores mínimos
    (SELECT min(temperatura) FROM registro WHERE DATE(dataRegistro) = CURDATE() AND fkSensor = ${idSala}) AS temperaturaMin,
    (SELECT dataRegistro FROM registro WHERE fkSensor = ${idSala} AND temperatura = temperaturaMin ORDER BY dataRegistro desc limit 1) AS dataTempMin,
    (SELECT min(umidade) FROM registro WHERE DATE(dataRegistro) = CURDATE() AND fkSensor = ${idSala}) AS umidadeMin,
    (SELECT dataRegistro FROM registro WHERE fkSensor = ${idSala} AND umidade = umidadeMin ORDER BY dataRegistro desc limit 1) AS dataUmiMin;
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