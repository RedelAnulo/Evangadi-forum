require("dotenv").config();

const express = require("express");
const app = express();
const port = 5500;

const cors = require("cors");

app.use(cors());

// db connection
const dbConnection = require("./db/dbConfig");

// user routes middleware File
const userRoutes = require("./routes/userRoute");

// questions routes middleware File
const questionRoutes = require("./routes/questionRoute");
// authentication routes middleware File

const authMiddleware = require("./middleware/authMiddleware");

// answers routes middleware File

// json middleware to extract json data
app.use(express.json());

// user routes middleware
app.use("/api/users", userRoutes);

// questions routes middleware
app.use("api/questions", authMiddleware, questionRoutes);

// answers routes middleware

async function start() {
	try {
		const result = await dbConnection.execute("select 'test' ");
		await app.listen(port);
		console.log("Database connection established");
		console.log(`listening on ${port}`);
	} catch (error) {
		console.log(error.message);
	}
}

start();
