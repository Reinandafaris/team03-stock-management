const express = require("express");

const router = express.Router();

const {findStock, createStock} = require("../controllers/stockControllers");

router.get("/", findStock);
router.post("/create", createStock);

module.exports = router;