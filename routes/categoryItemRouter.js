const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/categoryItemController");

router.get("/", categoryController.findCategory);
router.post("/create", categoryController.createCategory);

module.exports = router;
