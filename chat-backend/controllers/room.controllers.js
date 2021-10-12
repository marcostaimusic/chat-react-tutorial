const { response } = require("express");
const Room = require("../models/room");
const User = require("../models/user");

async function createRoom(payload) {
  try {
    const { name } = payload;
    const trimmedName = name
      .split(" ")
      .filter((s) => s)
      .join("-");
    console.log(trimmedName);
    const existingRoom = await Room.findOne({ name });

    if (existingRoom) {
      return res.status(400).json({ ok: false, msg: "Name already in use" });
    }

    const room = new Room(payload);
    room.type = "room";
    await room.save();
    // const rooms = await Room.findOne().populate('messages')
    // const messages = rooms.messages

    return room;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getUserName(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ ok: false, msg: "User not found" });
    }

    return res.json({
      ok: true,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

// async function getRooms(req, res) {
//   try {
//     const rooms = await Room.find();
//     if (rooms) {
//       return res.json({
//         ok: true,
//         rooms,
//       });
//     } else {
//       return res.json({
//         ok: false,
//         message: "No rooms",
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// }

const getRooms = async () => {
  const rooms = await Room.find();
  return rooms;
};

async function getRoom(req, res) {
  try {
    const name = req.params.name;

    const existingRoom = await Room.findOne({ name });
    if (existingRoom) {
      return res.json({
        ok: false,
        message: name,
      });
    } else {
      return res.json({
        ok: true,
        message: name,
      });
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

// try {
//   const existingRoom = await room.findOne(name)

//   const room = await Room.findById(id).populate("messages");
//   const messages = room.messages;
//   connection.close();
//   res.send({ message: `Messages for ${room.name}:`, room, messages });
//   return room;
// } catch (err) {
//   connection.close();
//   return res.status(500).json({ ok: false, msg: "Something went wrong" });
// }
//}

module.exports = { createRoom, getRooms, getRoom, getUserName };

// const { response } = require("express");
// const Room = require("../models/room");

// const createRoom = async (req, res = response) => {
//   try {
//     const { name } = req.body;

//     const existingRoom = await Room.findOne({ name });

//     if (existingRoom) {
//       return res.status(400).json({ ok: false, msg: "Name already in use" });
//     }

//     const newRoom = new Room(req.body);

//     await newRoom.save();

//     res.json({
//       ok: true,
//       newRoom,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ ok: false, msg: "Something went wrong" });
//   }
// };

// module.exports = { createRoom };
