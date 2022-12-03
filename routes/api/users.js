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

// /api/users/friend
router.route("/:userId").put((req, res) => {
  // newParam = parseInt(req.params.userId);
  User.findByIdAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.body.friends } },
    { runValidators: true, new: true }
  )
    .then((user) => {
      !user
        ? res.status(404).json({ message: "No user with this id!" })
        : res.json(user);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
