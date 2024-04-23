const { model } = require("mongoose");
const { Thread } = require("../models/ThreadModel");
const { User } = require("../models/UserModel");

//3. Get all parent thread
exports.getAllParentThread = async function (req, res) {
  try {
    //Get all thread that has no parent (parentId = null) and sort by createdAt descending
    let result; // Save the result here

    //Dont forget to populate author and children and populate the author of the children (Hint: Terdapat contoh response pada soal)

    //Send the response with status 200
  } catch (err) {
    //Send the response with status 400
  }
};

//4. Get thread by ID
exports.getThreadById = async function (req, res) {
  try {
    //Get the threadId from the request params (Hint : Gunakan params bukan body untuk getRequest)
    const { threadId } = req.params;

    //Find the thread by its ID and populate the author and children, and populate the author of the children (Menggunakan _id)

    //If the thread is not found throw an error

    //Send the response same as the example in the question
  } catch (err) {
    //Send the response with status 400 and message
  }
};

//5. Create a new thread
exports.createThread = async function (req, res) {
  try {
    //Get the text and author id from the request body (Gunakan body form-urlencoded)
    const { text, author } = req.body;

    //Check is author exist (Hint : Gunakan exists method pada User model)

    //If author not found throw an error

    //Create a new thread with the text and author

    //Push the new thread id to the author threads array (Hint: gunakan $push))

    //Send the response
  } catch (err) {
    //Send the response with status 400 and message
    console.log(`Error Message: ${err.message}`);
  }
};

//6. Add comment to thread
exports.addCommentToThread = async function (req, res) {
  try {
    //Get the threadId, commentText, and userId from the request body (Gunakan body form-urlencoded)
    const { threadId, commentText, userId } = req.body;

    //Find the original thread by its ID (Hint: Gunakan findById)

    //If the original thread is not found throw an error

    //Create a new thread with the comment text dont forget add the author and parentId and save it (Gunakan new Thread dan save method)

    // Use push to add the new comment thread id to the original thread children array

    //Save the updated original thread using save method

    //Send the 201 response status
  } catch (err) {
    //Send the response with status 400 and message
  }
};
