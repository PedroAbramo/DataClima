var salaModel = require("../models/salaModel");

function buscarSalasPorDatacenter(req, res) {
  var idData = req.params.idDatacenter;
  console.log("Recuperando as salas do datacenter: ", idData);

  salaModel.buscarSalasPorDatacenter(idData).then((resultado) => {
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
module.exports = {
  buscarSalasPorDatacenter
}