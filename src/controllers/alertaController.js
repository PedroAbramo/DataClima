var relatorioModel = require('../models/alertaModel');

function gerarAlerta(req, res) {
    relatorioModel.gerarAlerta()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}
module.exports = {
    gerarAlerta
};