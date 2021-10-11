const { Schema, model } = require("mongoose");
const Mongoose = require("mongoose");
const moment = require("moment");

const RoomSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  type: {
    type: String,
  },
});

RoomSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

const Room = model("Room", RoomSchema);

module.exports = Room;

// const { Schema, model } = require("mongoose");

// const RoomSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   users: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//   ],
//   messages: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Message",
//     },
//   ],
// });

// RoomSchema.method("toJSON", function () {
//   const { __v, _id, ...object } = this.toObject();
//   object.uid = _id;
//   return object;
// });

// module.exports = model("Room", RoomSchema);
