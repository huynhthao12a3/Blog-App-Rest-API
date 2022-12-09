const User = require("../models/UserModel");
const Post = require("../models/PostModel");
const bcrypt = require("bcrypt");

const UserTroller = {
	// UPDATE
	update: async (req, res) => {
		if (req.body.userId === req.params.id) {
			if (req.body.password) {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			}
			try {
				const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
				return res.status(200).json(updateUser);
			} catch (err) {
				return res.status(500).json(err);
			}
		} else {
			return res.status(401).json("You can update only your account.");
		}
	},

	// DELETE
	delete: async (req, res) => {
		if (req.body.userId === req.params.id) {
			const user = User.findById(req.params.id);
			console.log(user);
			if (user) {
				try {
					await Post.deleteMany({ username: user.username });
					await User.findByIdAndDelete(req.params.id);
					return res.status(200).json("User has been deleted.");
				} catch (err) {
					return res.status(500).json(err);
				}
			} else {
				return res.status(401).json("User not found.");
			}
		} else {
			return res.status(401).json("You can update only your account.");
		}
	},

	// GET
	get: async (req, res) => {
		try {
			const user = await User.findById(req.params.id);
			if (user) {
				const { password, ...others } = user._doc;
				return res.status(200).json(others);
			} else {
				return res.status(401).json("User not found.");
			}
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};

module.exports = UserTroller;
