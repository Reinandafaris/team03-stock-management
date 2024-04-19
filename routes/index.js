const router = require("express").Router();

const authRouter = require("./authRouter");

router.use("/api/v1", authRouter);

module.exports = router;
