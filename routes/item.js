const express = require("express");
const {
  getAllItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/item");

const router = express.Router();

router.get("/", getAllItem);
router.post("/create", createItem);
router.patch("/update/:id", updateItem);
router.delete("/delete/:id", deleteItem);

module.exports = router;
