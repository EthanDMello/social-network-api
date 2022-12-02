const router = require("express").Router();
const { User } = require("../../models");

// /api/users/
router.route("/").get((req, res) => res.json("hit user"));

// /api/users/all
router.route("/all").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});

// /api/users/new
router.route("/new").post((req, res) => {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
