const express = require("express");
const {
  getAllItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/item");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/", getAllItem);
router.post("/create", upload.array("images"), createItem);
router.patch("/update/:id", upload.array("images"), updateItem);
router.delete("/delete/:id", deleteItem);

module.exports = router;
