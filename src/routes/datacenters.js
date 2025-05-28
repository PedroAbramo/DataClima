var express = require("express");
var router = express.Router();

var datacenterController = require("../controllers/datacenterController");

router.get("/:empresaId", function (req, res) {
  datacenterController.buscarDatacenterPorDatacenter(req, res);
});

module.exports = router;