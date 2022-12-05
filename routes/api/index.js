const router = require("express").Router();

const users = require("./users");
const thoughts = require("./thoughts");
const reactions = require("./reactions");

router.use("/users", users);
router.use("/thoughts", thoughts);
router.use("/thoughts", reactions);

module.exports = router;
