const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
// answer post controller
async function answerPost(req, res) {
	const userid = req.user.userid;
	const questionid = req.params.questionid;
	const { answer } = req.body;
	if (!answer) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "all fields required" });
	}
	try {
		const answerid = uuidv4();
		await dbConnection.query(
			"INSERT INTO answers(answerid,userid,questionid,answer) VALUES(?,?,?,?)",
			[answerid, userid, questionid, answer]
		);
		return res.status(StatusCodes.CREATED).json({ msg: "answer posted" });
	} catch (error) {
		console.log(error);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something wrong" });
	}
}

async function allAnswers(req, res) {
	// const userid = req.user.userid;
	const questionid = req.params.questionid;
	try {
		const [answers] = await dbConnection.query(
			"select username,answer FROM answers JOIN users ON answers.userid=users.userid Where answers.questionid =? ORDER BY id DESC",
			[questionid]
		);
		if (answers.length == 0) {
			return res.status(StatusCodes.BAD_REQUEST).json({ msg: "no answer" });
		} else {
			return res.status(StatusCodes.OK).json({ answers });
		}
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something went wrong, try again later!" });
	}
}

module.exports = { allAnswers, answerPost };
