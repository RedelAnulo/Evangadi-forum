require("dotenv").config();

const express = require("express");
const app = express();
const port = 5500;

const cors = require("cors");
let rateLimit = require("express-rate-limit");

app.use(cors());

//db connection file
const dbConnection = require("./db/dbConfig");

//user routes middleware file
const userRoutes = require("./routes/userRoute");

//question routes middleware file
const questionRoutes = require("./routes/questionRoute");

//answer routes middleware file
const answerRoutes = require("./routes/answerRoute");

//authentication middleware file
const authMiddleware = require("./middleware/authMiddleware");

//json middleware to extract json data
app.use(express.json());

//users route middleware
app.use("/api/users", userRoutes);

//answers route middleware
app.use("/api/answers", authMiddleware, answerRoutes);

//questions route middleware
app.use("/api/questions", authMiddleware, questionRoutes);

async function start() {
	try {
		const result = await dbConnection.execute("select 'test' ");
		await app.listen(port);
		console.log("database connection established");
		console.log(`listening on port:${port}`);
	} catch (error) {
		console.log(error.message);
	}
}
start();
