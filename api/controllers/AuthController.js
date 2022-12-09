const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const AuthController = {
	// REGISTER
	register: async (req, res) => {
		try {
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(req.body.password, salt);
			const newUser = User({
				username: req.body.username,
				email: req.body.email,
				password: hashPassword,
			});
			await newUser.save();
			res.status(200).json({
				success: true,
				data: newUser,
			});
		} catch (err) {
			res.status(500).json(err);
		}
	},

	// LOGIN
	login: async (req, res) => {
		try {
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				return res.status(400).json("Do not find email.");
			}

			const validated = await bcrypt.compare(req.body.password, user.password);
			if (!validated) {
				return res.status(400).json("Email or password wrong.");
			}

			const { password, ...others } = user._doc;
			return res.status(200).json(others);
		} catch (err) {
			res.status(500).json(err);
		}
	},
};

module.exports = AuthController;
