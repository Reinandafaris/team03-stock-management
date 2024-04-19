const express = require("express");

const router = express.Router();

const {findStock, createStock, updateStock, deleteStock} = require("../controllers/stockControllers");

router.get("/", findStock);
router.post("/create", createStock);
router.patch("/update/:id", updateStock);
router.delete("/delete/:id", deleteStock);

module.exports = router;