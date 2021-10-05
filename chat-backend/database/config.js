// require("dotenv").config(); // non serve perchè è chiamato in server.js
const Mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    Mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected to MongoDB ${process.env.CLUSTER}`);
  } catch (err) {
    console.log(err);
    throw new Error("Database error");
  }
};

module.exports = { dbConnection };
