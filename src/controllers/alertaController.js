var alertaModel = require('../models/alertaModel');

function gerarAlerta(req, res) {
    alertaModel.gerarAlerta()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarAlertasAtivos(req, res) {
    const idDatacenter = req.params.idDatacenter;
    alertaModel.listarAlertasAtivos(idDatacenter)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    gerarAlerta,
    listarAlertasAtivos
};