const express = require("express");

const router = express.Router();

const {findStock} = require("../controllers/stockControllers");

router.get("/", findStock);
router.post("/create", stockController.createStock);

module.exports = router;