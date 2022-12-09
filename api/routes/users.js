const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

// UPDATE
router.put("/update/:id", UserController.update);

// DELETE
router.delete("/delete/:id", UserController.delete);

// DELETE
router.get("/get/:id", UserController.get);

module.exports = router;
