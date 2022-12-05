const router = require("express").Router();
const { Thoughts, User, Reactions } = require("../../models");

// /api/thoughts/
router.route("/").get((req, res) => res.json("hit thoughts"));

// /api/thoughts/all
router.route("/all").get((req, res) => {
  Thoughts.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
});

// /api/thoughts/new
router.route("/new").post((req, res) => {
  Thoughts.create(req.body)
    .then((thought) => {
      return User.findByIdAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought } },
        { runValidators: true, new: true }
      );
    })
    .then((user) =>
      !user
        ? res.status(404).json({
            message: "thought created, but found no user with that ID",
          })
        : res.json("Created the thought")
    )
    .catch((err) => res.status(500).json(err));
});

// /api/thoughts/:id
router.route("/:id").get((req, res) => {
  Thoughts.findOne({ _id: req.params.id })
    .select("-__v")
    .then((thoughts) =>
      !thoughts
        ? res.status(404).json({ message: "No thoughts with that ID" })
        : res.json(thoughts)
    )
    .catch((err) => res.status(500).json(err));
});

// /api/thoughts/:id/reactions/new
router.route("/:id/reactions/new").post((req, res) => {
  Thoughts.findOneAndUpdate(
    { _id: req.params.id },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((thoughts) =>
      !thoughts
        ? res.status(404).json({ message: "No thoughts with that ID" })
        : res.json(thoughts)
    )
    .catch((err) => res.status(500).json(err));
});

// /api/thoughts/:id/reactions/delete
router.route("/:id/reactions/delete").delete((req, res) => {
  Thoughts.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { reactions: { reactionId: req.body.reactionId } } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "No reaction with that ID" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
});

// /api/thoughts/friend
router.route("/:thoughtId").put((req, res) => {
  Thoughts.findByIdAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body.reaction } },
    { runValidators: true, new: true }
  )
    .then((thoughts) => {
      !thoughts
        ? res.status(404).json({ message: "No thoughts with this id!" })
        : res.json(thoughts);
    })
    .catch((err) => res.status(500).json(err));
});

// api/thoughts/delete/:id
router.route("/delete/:id").delete((req, res) => {
  Thoughts.findOneAndRemove({ _id: req.params.id })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought with that ID" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
