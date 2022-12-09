const mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateVietNam = moment.tz(Date.now(), "Asia/Hanoi");

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		profilePic: {
			type: String,
			default: "",
		},
	},
	{
		timestamps: true,
	}
);

let User = mongoose.model("User", UserSchema);

module.exports = User;
