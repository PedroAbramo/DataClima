var database = require("../database/config");

function buscarRelatorioSemanal(idDatacenter) {

  var instrucaoSql = `SELECT
    data,
    total
FROM (
    SELECT DATE(r.dataRegistro) AS data, COUNT(*) AS total
    FROM datacenter da
    INNER JOIN sala sa ON sa.fkdatacenter = da.id
    INNER JOIN sensor se ON se.fkSala = sa.id
    INNER JOIN registro r ON r.fkSensor = se.fksala
    INNER JOIN alerta a ON a.fkRegistro = r.id
    WHERE r.dataRegistro >= CURDATE() - INTERVAL 6 DAY
      AND r.dataRegistro < CURDATE() + INTERVAL 1 DAY
      AND da.id = ${idDatacenter}  
    GROUP BY DATE(r.dataRegistro)
) AS sub
ORDER BY data DESC;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarRelatorioDiaMaisAlerta(idSala) {

  var instrucaoSql = `
  SELECT 
    HOUR(r.dataRegistro) AS hora,
    COUNT(a.id) AS total_alertas
FROM alerta a
JOIN registro r ON a.fkRegistro = r.id
WHERE r.fkSensor = ${idSala}
  AND r.dataRegistro >= CURDATE() - INTERVAL 6 DAY
  AND r.dataRegistro < CURDATE() + INTERVAL 1 DAY
GROUP BY hora
ORDER BY hora;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarRelatorioSemanal,
  buscarRelatorioDiaMaisAlerta
}
