var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT id, nome, cnpj, codigo_ativacao FROM empresa`;

  return database.executar(instrucaoSql);
}

module.exports = {
  buscarPorId, listar
};
