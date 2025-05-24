var database = require("../database/config");

function buscarSalasPorDatacenter(empresaId) {

  var instrucaoSql = `SELECT * FROM sala WHERE fkEmpresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarSalasPorDatacenter
}
