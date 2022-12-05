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

router.route("/:id").get((req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-__v")
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
});

// /api/users/friend
router.route("/friend/:userId").put((req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.body } },
    { runValidators: true, new: true }
  )
    .then((user) => {
      !user
        ? res.status(404).json({ message: "No user with this id!" })
        : res.json(user);
    })
    .catch((err) => res.status(500).json(err));
});

// api/users/delete/:id
router.route("/delete/:id").delete((req, res) => {
  User.findOneAndRemove({ _id: req.params.id })
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
