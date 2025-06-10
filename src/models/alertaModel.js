var database = require("../database/config");

function listarAlertasAtivos(ID_DATACENTER) {
    var instrucao = `
    SELECT 
        a.id AS id_alerta,
        a.status,
        a.tipo,
        a.motivo,
        a.data_resolucao,
        r.id AS id_registro,
        r.temperatura,
        r.umidade,
        r.dataRegistro,
        se.fkSala as id_sensor,
        se.nome AS nome_sensor,
        s.id as id_sala,
        s.nome AS nome_sala,
        d.id as id_datacenter,
        d.nome AS nome_datacenter
    FROM alerta a
    INNER JOIN registro r ON a.fkRegistro = r.id
    INNER JOIN sensor se ON r.fkSensor = se.fkSala
    INNER JOIN sala s ON se.fkSala = s.id
    INNER JOIN datacenter d ON s.fkDatacenter = d.id
    WHERE a.status = 'ativo' and d.id = ${ID_DATACENTER}
    ORDER BY a.id DESC
    LIMIT 10
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarAlertasAtivos
};
