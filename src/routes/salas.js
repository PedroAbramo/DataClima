var express = require("express");
var router = express.Router();

var SalaController = require("../controllers/salaController");

router.get("/:datacenterId", function (req, res) {
  SalaController.buscarSalasPorDatacenter(req, res);
});

module.exports = router;