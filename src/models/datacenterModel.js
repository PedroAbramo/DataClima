var database = require("../database/config");

function buscarDatacentersPorEmpresa(empresaId) {

  var instrucaoSql = `SELECT id, nome as 'datacenter' FROM datacenter WHERE fkEmpresa = ${empresaId}
  ORDER BY nome`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarRegistrosSala(salaId) {
  var instrucaoSql = `SELECT temperatura, umidade, dataRegistro 
  FROM registro WHERE fkSensor = 1 
  ORDER BY dataRegistro DESC 
  LIMIT 10;`

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarDatacentersPorEmpresa,
  buscarRegistrosSala
}
