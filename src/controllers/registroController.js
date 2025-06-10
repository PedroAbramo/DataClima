var registroModel = require("../models/registroModel");

function buscarRegistrosSala(req, res) {
  var idSala = req.params.idSala;

  registroModel.buscarRegistrosSala(idSala).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } 
  })
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
    buscarRegistrosSala,
    ultimaAtualizacao,
    TemperaturaUmidadeMAXMIN
}