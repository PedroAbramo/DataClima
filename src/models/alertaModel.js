var database = require("../database/config");

function listarAlertasAtivos() {
    var instrucao = `
        SELECT 
            id,
            fkRegistro,
            status,
            tipo,
            motivo
        FROM alerta
        WHERE status = 'ativo';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarAlertasAtivos
};
