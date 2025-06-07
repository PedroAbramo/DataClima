var express = require("express");
var router = express.Router();

var SalaController = require("../controllers/salaController");

router.get("/:idDatacenter", function (req, res) {
  SalaController.buscarSalasPorDatacenter(req, res);
});

module.exports = router;