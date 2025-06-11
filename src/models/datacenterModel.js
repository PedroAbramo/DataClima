var database = require("../database/config");

function buscarDatacentersPorEmpresa(empresaId) {

  var instrucaoSql = `SELECT id, nome as 'datacenter' FROM datacenter WHERE fkEmpresa = ${empresaId}
  ORDER BY nome`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarAlertas(empresaId) {

  var instrucaoSql = `
    SELECT distinct d.id, d.nome
    FROM alerta a
	  INNER JOIN registro r ON a.fkRegistro = r.id
    INNER JOIN sensor se ON r.fkSensor = se.fkSala
    INNER JOIN sala s ON se.fkSala = s.id
    INNER JOIN datacenter d ON s.fkDatacenter = d.id
    WHERE d.fkEmpresa = ${empresaId}
    AND DATE(r.dataRegistro) = CURDATE();
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarDatacentersPorEmpresa,
  buscarAlertas
}
