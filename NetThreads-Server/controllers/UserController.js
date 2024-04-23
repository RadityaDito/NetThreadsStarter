const { Thread } = require("../models/ThreadModel");
const { User } = require("../models/UserModel");

exports.updateUser = async function (req, res) {
  try {
    const { userId, username, name, image, bio } = req.body;

    await User.findOneAndUpdate(
      { id: userId },
      {
        id: userId,
        username: username.toLowerCase(),
        name,
        image,
        bio,
        onboarded: true,
      },
      { upsert: true }
    );

    res.status(200).json({ success: true, message: "Success Create User" });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: `Failed to create/update user: ${err.message}`,
    });
  }
};

//1. Get all user and sort by updatedAt in descending order
exports.getAllUser = async function (req, res) {
  try {
    //Get all user and sort by updatedAt in descending order
    let result;

    //Send the response with status 200 (Gunakan contoh diatas sebagai referensi)
  } catch (err) {
    //Send the response with status 400
    // res.status(400).json({ success: false, message: err.message });
    console.log(err);
  }
};

//2. Get user by ID (Hint: findOne dan GUNAKAN id BUKAN _id)
exports.getUserById = async function (req, res) {
  try {
    const { userId } = req.params;

    //Find the user by its ID (Note : findOne dan GUNAKAN id BUKAN _id)

    //If the user is not found throw an error
    if (!user) throw new Error("User not found");

    // Send the response with status 200
  } catch (error) {
    console.log(error);
  }
};

//7. Get all the users posts for profile page
exports.getUserPosts = async function (req, res) {
  try {
    //Get the userId from the request params
    const { userId } = req.params;

    //Find the user by its ID and populate the threads and children, and populate the author of the children (Hint: Terdapat contoh response pada soal) GUNAKAN ID bukan _id

    //Send the response with status 200
  } catch (error) {
    //Send the response with status 400
    console.log(error);
  }
};
