const express = require("express");
const router = express.Router();

var alertaController = require("../controllers/alertaController");

router.get("/", function (req, res) {
    alertaController.gerarAlerta(req, res);
});

router.get("/listarAlertasAtivos/:idDatacenter", function (req, res) {
    alertaController.listarAlertasAtivos(req, res);
});

module.exports = router;