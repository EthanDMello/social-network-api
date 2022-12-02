const router = require("express").Router();

const { User } = require("../../models");

router.route("/").get((req, res) => res.json("hit user"));

router.route("/all").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});

router.route("/:id").put((req, res) => {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
