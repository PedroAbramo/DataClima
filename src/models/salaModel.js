var database = require("../database/config");

function buscarSalasPorDatacenter(datacenterId) {

  var instrucaoSql = `SELECT * FROM sala WHERE fkdatacenter = ${datacenterId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarSalasPorDatacenter
}
