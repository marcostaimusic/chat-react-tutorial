const User = require("../models/user");
const Message = require("../models/message");
const Room = require("../models/room");

const connectedUser = async (uid) => {
  try {
    const user = await User.findById(uid);
    user.online = true;
    await user.save();
    return user;
  } catch (err) {
    console.log(err);
    res.status(500).json({ ok: false, msg: "Something went wrong" });
  }
};

const existingRooms = async () => {
  try {
    const rooms = await Room.find();
    return rooms;
  } catch (err) {
    console.log(err);
    res.status(500).json({ ok: false, msg: "Something went wrong" });
  }
};

const disconnectedUser = async (uid) => {
  try {
    const user = await User.findById(uid);
    user.online = false;
    await user.save();
    return user;
  } catch (err) {
    console.log(err);
    res.status(500).json({ ok: false, msg: "Something went wrong" });
  }
};

const getUsers = async () => {
  try {
    const users = await User.find().sort("-online");
    return users;
  } catch (err) {
    console.log(err);
    res.status(500).json({ ok: false, msg: "Something went wrong" });
  }
};

const recordMessage = async (payload) => {
  try {
    const message = await new Message(payload);
    await message.save();
    return message;
  } catch (err) {
    console.log(err);
    res.status(500).json({ ok: false, msg: "Something went wrong" });
    return false;
  }
};

module.exports = {
  connectedUser,
  disconnectedUser,
  getUsers,
  recordMessage,
  existingRooms,
};
