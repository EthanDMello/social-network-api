const router = require("express").Router();
// const courseRoutes = require("./courseRoutes");
const studentRoutes = require("./studentRoutes");
const users = require("./users");

// router.use('/courses', courseRoutes);
router.use("/students", studentRoutes);
router.use("/users", users);

module.exports = router;
