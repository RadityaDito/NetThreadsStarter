const express = require("express");
const userController = require("../controllers/UserController");
const router = express.Router();

//STARTS WITH /user

//GetAllUser
router.get("", userController.getAllUser);
//Update and Create New User
router.post("/upsert", userController.updateUser);
//GetUserPosts (/getUserPosts/:userId)

module.exports = router;
