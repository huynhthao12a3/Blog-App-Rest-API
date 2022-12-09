const User = require("../models/UserModel");
const Post = require("../models/PostModel");

const PostController = {
	// CREATE POST
	create: async (req, res) => {
		try {
			const newPost = new Post(req.body);
			await newPost.save();
			return res.json(newPost);
		} catch (err) {
			return res.json(err);
		}
	},

	// UPDATE
	update: async (req, res) => {
		try {
			const post = await Post.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			return res.json(post);
		} catch (err) {
			return res.json(err);
		}
	},

	// GET
	get: async (req, res) => {
		try {
			const post = await Post.findById(req.params.id);
			if (post) {
				return res.status(200).json(post);
			} else {
				return res.status(401).json("Post not found.");
			}
		} catch (err) {
			return res.status(500).json(err);
		}
	},

	// GET
	getAll: async (req, res) => {
		try {
			const username = req.query.username;
			if (username) {
				const post = await Post.find({ username }).sort({ createdAt: "desc" });
				return res.status(200).json(post);
			} else {
				const post = await Post.find().sort({ createdAt: "desc" });
				return res.status(200).json(post);
			}
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};

module.exports = PostController;
