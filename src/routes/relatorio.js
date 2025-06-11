var express = require("express");
var router = express.Router();

var relatorioController = require("../controllers/relatorioController");

router.get("/buscarRelatorioSemanal/:idDatacenter", function (req, res) {
  relatorioController.buscarRelatorioSemanal(req, res);
});

router.get("/buscarRelatorioDiaMaisAlerta/:idSala", function (req, res) {
  relatorioController.buscarRelatorioDiaMaisAlerta(req, res);
});

module.exports = router;