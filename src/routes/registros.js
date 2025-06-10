var express = require("express");
var router = express.Router();

var registroController = require("../controllers/registroController");

router.get("/buscarRegistrosSala/:idSala", function (req, res) {
    registroController.buscarRegistrosSala(req, res);
})

router.get("/ultimaAtualizacao", function (req, res) {
    registroController.ultimaAtualizacao(req, res);
})

router.get("/TemperaturaUmidadeMAXMIN/:idSala", function (req, res) {
    registroController.TemperaturaUmidadeMAXMIN(req, res);
})

router.get("/exibirValoresDaSala/:datacenterId", function (req, res) {
    registroController.exibirValoresDaSala(req, res);
})

module.exports = router;