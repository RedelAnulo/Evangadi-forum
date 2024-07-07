const express = require('express')
const router= express.Router()

const {
	allQuestions,
	singleQuestion,
	questionPost,
} = require("../controller/questionController");
// all question route
router.get("/all-questions", allQuestions);
// single question route
router.get("/:questionid", singleQuestion);
// question post route
router.post("/post-question", questionPost);

module.exports = router;

// router.get("/all-questions", (req,res)=>{
//     res.send("all questions")
// })
