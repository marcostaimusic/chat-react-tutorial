const { response } = require("express");
const User = require("../models/user");

const createUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ ok: false, msg: "Email already in use" });
    }

    const user = new User(req.body);
    await user.save();
    res.json({
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ ok: false, msg: "Something went wrong" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: "login",
    email,
    password,
  });
};

const renewToken = async (req, res) => {
  res.json({
    ok: true,
    msg: "renew token",
  });
};

module.exports = { createUser, login, renewToken };
