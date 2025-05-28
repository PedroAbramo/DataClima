var database = require("../database/config");

function buscarDatacentersPorEmpresa(empresaId) {

  var instrucaoSql = `SELECT id, nome as 'datacenter' FROM datacenter WHERE fkEmpresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarDatacentersPorEmpresa
}
