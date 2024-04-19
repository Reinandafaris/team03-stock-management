const router = require("express").Router();

const authRouter = require("./authRouter");
const companyRouter = require("./companyRouter");
const stockRouter = require ("./stockRouter");

router.use("/api/v1", authRouter);
router.use("/api/v1/company", companyRouter);
router.use("/api/v1/stock", stockRouter);

module.exports = router;
