var express = require("express");
var router = express.Router();

var datacenterController = require("../controllers/datacenterController");

router.get("/:empresaId", function (req, res) {
  datacenterController.buscarDatacenterPorEmpresa(req, res);
});

router.get("/buscarAlertas/:empresaId", function (req, res) {
  datacenterController.buscarAlertas(req, res);
});

module.exports = router;