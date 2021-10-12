require("dotenv").config();
const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const User = require("../models/user");
const { OAuth2Client } = require("google-auth-library");

const salt = bcrypt.genSaltSync();
const createUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ ok: false, msg: "Email already in use" });
    }

    const user = new User(req.body);

    // * encrypting password

    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //token

    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ ok: false, msg: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ ok: false, msg: "inexistent" });
    }

    //validate password
    const validPassword = bcrypt.compareSync(password, existingUser.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ ok: false, msg: "Invalid email or password" });
    }

    // generate JWT
    const token = await generateJWT(existingUser.id);

    return res.json({
      ok: true,
      existingUser,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false, msg: "Something went wrong" });
  }
};

const renewToken = async (req, res) => {
  const uid = req.uid;
  // generate new JWT with uid
  const token = await generateJWT(uid);

  const existingUser = await User.findById(uid);
  return res.json({
    ok: true,
    existingUser,
    token,
  });
};

const client = new OAuth2Client(
  "516113137194-lfa4g8g7ladk19t56ol43p597c1tm6t1.apps.googleusercontent.com"
);

const googleLogin = async (req, res) => {
  // console.log("received");
  const { tokenId } = req.body;

  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "516113137194-lfa4g8g7ladk19t56ol43p597c1tm6t1.apps.googleusercontent.com",
    })
    .then(async (response) => {
      console.log(response);
      const { email_verified, name, email } = response.payload;
      const trimmedEmail = email.split("@");
      const noDotsEmail =
        trimmedEmail[0].replace(/\./g, "") + "@" + trimmedEmail[1];
      // console.log(noDotsEmail);
      if (email_verified) {
        try {
          const user = await User.findOne({ email: noDotsEmail });
          console.log(user);
          if (user) {
            const { id } = user;
            const token = generateJWT(id);

            res.json({
              ok: true,
              token,
              user,
            });
          } else {
            const password = "1234";
            const user = await new User({ name, email: noDotsEmail, password });
            await user.save();

            user.password = bcrypt.hashSync(password, salt);
            await user.save();
            console.log(user.id);
            const token = generateJWT(user.id);
            console.log(token);

            res.json({
              ok: true,
              token,
              user,
            });
          }
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: "Something went wrong" });
        }
      }
    });
};

module.exports = { createUser, login, renewToken, googleLogin };
