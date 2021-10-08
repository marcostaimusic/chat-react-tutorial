const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const User = require("../models/user");

const createUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ ok: false, msg: "Email already in use" });
    }

    const user = new User(req.body);

    // * encrypting password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //token

    const token = await generateJWT(user.id);

    res.json({
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

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ ok: false, msg: "Invalid email or password" });
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

module.exports = { createUser, login, renewToken };
