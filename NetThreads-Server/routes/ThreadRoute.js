const express = require("express");
const threadController = require("../controllers/ThreadController");
const router = express.Router();

//STARTS WITH /thread

//Create New Thread ("/thread")
router.post("", threadController.createThread);
//Get All Parent Threads ("/thread")
router.get("", threadController.getAllParentThread);

//Get Thread by ID

//Add Comment to Thread

module.exports = router;
