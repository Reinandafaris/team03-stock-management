const express = require("express");

const router = express.Router();

const categoryItemController = require("../controllers/categoryItemController");

router.get("/", categoryItemController.findCategory);
router.post("/create", categoryItemController.createCategory);


module.exports = router;


