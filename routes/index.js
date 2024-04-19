const router = require("express").Router();

const authRouter = require("./authRouter");
const companyRouter = require("./companyRouter");

router.use("/api/v1", authRouter);
router.use("/api/v1/company", companyRouter);

module.exports = router;
