const router = require("express").Router();
const { Thoughts } = require("../../models");

// /api/users/
router.route("/").get((req, res) => res.json("hit thoughts"));

// /api/users/all
router.route("/all").get((req, res) => {
  Thoughts.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
});

// /api/users/new
router.route("/new").post((req, res) => {
  Thoughts.create(req.body)
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
});

// /api/users/friend
router.route("/:userId").put((req, res) => {
  // newParam = parseInt(req.params.userId);
  Thoughts.findByIdAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.body.friends } },
    { runValidators: true, new: true }
  )
    .then((thoughts) => {
      !thoughts
        ? res.status(404).json({ message: "No thoughts with this id!" })
        : res.json(thoughts);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
