const router = require("express").Router();
// const courseRoutes = require("./courseRoutes");
const studentRoutes = require("./studentRoutes");
const users = require("./users");
const thoughts = require("./thoughts");

// router.use('/courses', courseRoutes);
router.use("/students", studentRoutes);
router.use("/users", users);
router.use("/thoughts", thoughts);

module.exports = router;
