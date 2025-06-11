var datacenterModel = require("../models/datacenterModel");

function buscarDatacenterPorEmpresa(req, res) {
  var idUsuario = req.params.idUsuario;

  datacenterModel.buscarDatacentersPorEmpresa(idUsuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as salas: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarAlertas(req, res) {
  var idEmpresa = req.params.empresaId;

  datacenterModel.buscarAlertas(idEmpresa).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os alertas: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  buscarDatacenterPorEmpresa,
  buscarAlertas
}