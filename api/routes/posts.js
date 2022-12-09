const express = require("express");
const router = express.Router();

const PostController = require("../controllers/PostController");

// POST
router.post("/create", PostController.create);

// UPDATE
router.put("/update/:id", PostController.update);

// GET
router.get("/get/:id", PostController.get);

// GET ALL
router.get("/getall", PostController.getAll);

module.exports = router;
