// require("dotenv").config(); // non serve perchè è chiamato in server.js
const Mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    Mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
    throw new Error("Database error");
  }
};

module.exports = { dbConnection };
