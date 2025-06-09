var registroModel = require("../models/registroModel");

function buscarUltimosRegistros(req, res) {

    const limite_linhas = 7;

    var idSala = req.params.idSala;

    console.log(`Recuperando os ultimos ${limite_linhas} registros`);

    registroModel.buscarUltimosRegistros(idSala, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os últimos registros.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarRegistrosEmTempoReal(req, res) {

    var idSala = req.params.idSala;

    console.log(`Recuperando registros em tempo real`);

    registroModel.buscarRegistrosEmTempoReal(idSala).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os últimos registros.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

    function ultimaAtualizacao(req, res) {
    registroModel.ultimaAtualizacao().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}


    function TemperaturaUmidadeMAXMIN(req, res){

        var idSala = req.params.idSala;

        registroModel.TemperaturaUmidadeMAXMIN(idSala).then(function(resultado){
        res.status(200).json(resultado);

    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
    }

module.exports = {
    buscarUltimosRegistros,
    buscarRegistrosEmTempoReal,
    ultimaAtualizacao,
    TemperaturaUmidadeMAXMIN,

}