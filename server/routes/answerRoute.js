const express = require("express");
const router = express.Router();
const { allAnswers, answerPost } = require("../controller/answerController");

router.get("/:questionid", allAnswers);
router.post("/:questionid", answerPost);

module.exports = router;
