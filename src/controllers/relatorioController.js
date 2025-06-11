var relatorioModel = require("../models/relatorioModel");

function buscarRelatorioSemanal(req, res) {
  var idDatacenter = req.params.idDatacenter;

  relatorioModel.buscarRelatorioSemanal(idDatacenter).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar o relatorio semanal: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarRelatorioDiaMaisAlerta(req, res) {
  var idSala = req.params.idSala;

  relatorioModel.buscarRelatorioDiaMaisAlerta(idSala).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar o relatorio semanal: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarRelatorioDiaMaisAlertaDatacenter(req, res) {
  var idDatacenter = req.params.idDatacenter;

  relatorioModel.buscarRelatorioDiaMaisAlertaDatacenter(idDatacenter).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar o relatorio semanal: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  buscarRelatorioSemanal,
  buscarRelatorioDiaMaisAlerta,
  buscarRelatorioDiaMaisAlertaDatacenter
}