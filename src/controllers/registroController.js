var registroModel = require("../models/registroModel");

function ultimaAtualizacao(req, res) {
    registroModel.ultimaAtualizacao().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}


function TemperaturaUmidadeMAXMIN(req, res) {

    var idSala = req.params.idSala;

    registroModel.TemperaturaUmidadeMAXMIN(idSala).then(function (resultado) {
        res.status(200).json(resultado);

    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function exibirValoresDaSala(req, res) {

    var datacenterId = req.params.datacenterId

    registroModel.exibirValoresDaSala(datacenterId)
        .then(function (resultado) {
            res.json(resultado);
        })
}

function buscarRegistrosSala(req, res) {
    var idSala = re.params.idSala

    registroModel.buscarRegistrosSala(idSala)
        .then(function (resultado) {
            res.json(resultado);
        })
}


module.exports = {
    buscarRegistrosSala,
    ultimaAtualizacao,
    TemperaturaUmidadeMAXMIN,
    exibirValoresDaSala

}