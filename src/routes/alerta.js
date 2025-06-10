const express = require("express");
const router = express.Router();

var alertaController = require("../controllers/alertaController");

router.get("/", function (req, res) {
    alertaController.gerarAlerta(req, res);
});

module.exports = router;