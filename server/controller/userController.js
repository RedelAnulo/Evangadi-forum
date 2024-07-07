// db connection
const dbConnection = require("../db/dbConfig");

const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function register(req, res) {
	const { username, firstname, lastname, email, password } = req.body;
	if (!email || !password || !firstname || !lastname || !username) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Please provide all required fields" });
	}

	try {
		const [user] = await dbConnection.query(
			"SELECT username,userid FROM users WHERE username = ? OR email = ? ",
			[username, email]
		);

		if (user.length > 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "User already existed" });
		}
		if (password.length <= 8) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "Password must be 8 characters" });
		}

		// encrypt the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		await dbConnection.query(
			"INSERT INTO users(username, firstname, lastname, email, password) VALUES(?,?,?,?,?)",
			[username, firstname, lastname, email, hashedPassword]
		);
		return res.status(StatusCodes.CREATED).json({ msg: "User registered" });
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Something went wrong, please try again later!" });
	}
}

async function login(req, res) {
	const { email, password } = req.body;
	if (!email || !password) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Please enter all required fields!" });
	}

	try {
		const [user] = await dbConnection.query(
			"SELECT username,userid,password FROM users WHERE email = ? ",
			[email]
		);
		if (user.length == 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "Invalid Credential" });
		}
		// Compare password
		const isMatch = await bcrypt.compare(password, user[0].password);

		if (!isMatch) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "Invalid Credential" });
		}
		const username = user[0].username;
		const userid = user[0].userid;
		const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		return res
			.status(StatusCodes.OK)
			.json({ msg: "User login successful", token, username });
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Something went wrong, please try again later!" });
	}
}

async function checkUser(req, res) {
	const username = req.user.username;
	const userid = req.user.userid;

	res.status(StatusCodes.OK).json({ msg: "Valid user", username, userid });
}

module.exports = { register, login, checkUser };
