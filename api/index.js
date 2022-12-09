const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

const multer = require("multer");

dotenv.config();
app.use(morgan("combined"));
app.use(express.urlencoded());
app.use(express.json());
mongoose.connect(process.env.NODE_MONGODB_URL, (req, res) => {
	try {
		console.log("Connected to MongoDB...");
	} catch (err) {
		console.log(err);
	}
});

// Time
const moment = require("moment-timezone");
const dateVietNam = moment.tz(Date.now(), "Asia/Ho_Chi_Minh");
console.log("dateVietNam: ", dateVietNam);

const storage = multer.diskStorage({
	destination: (req, file, callback) => {},
});
// ROUTES
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);

app.listen("5000", () => {
	console.log("Backend is running...");
});
