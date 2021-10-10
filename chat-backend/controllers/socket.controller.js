const User = require("../models/user");
const Message = require("../models/message");

const connectedUser = async (uid) => {
  const user = await User.findById(uid);
  user.online = true;
  await user.save();
  return user;
};

const disconnectedUser = async (uid) => {
  const user = await User.findById(uid);
  user.online = false;
  await user.save();
  return user;
};

const getUsers = async () => {
  const users = await User.find().sort("-online");
  return users;
};

const recordMessage = async (payload) => {
  try {
    const message = await new Message(payload);
    await message.save();
    return message;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = { connectedUser, disconnectedUser, getUsers, recordMessage };
