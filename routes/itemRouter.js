const express = require("express");

const router = express.Router();

const itemController = require("../controllers/itemControllers");

router.get("/", itemController.getItems);
router.post("/create", itemController.createItem);

module.exports = router;
