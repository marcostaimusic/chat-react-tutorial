const {
  connectedUser,
  disconnectedUser,
  getUsers,
  recordMessage,
} = require("../controllers/socket.controller");
const { verifyJWT } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    //the socket is the client connecting to the server
    this.io.on("connection", async (socket) => {
      const [isValid, uid] = verifyJWT(socket.handshake.query["x-token"]);
      if (!isValid) {
        console.log("Unknown socket");
        socket.disconnect();
      }

      await connectedUser(uid);

      socket.join(uid); // se commento questa linea non si scambiano più i messaggi

      this.io.emit("connectedUsersList", await getUsers());

      socket.on("personalMessage", async (payload) => {
        const message = await recordMessage(payload);
        this.io.to(payload.to).emit("personalMessage", message);
        this.io.to(payload.from).emit("personalMessage", message);
      });

      // console.log(uid, "client connected");

      socket.on("disconnect", async () => {
        await disconnectedUser(uid);
        // console.log("client disconnected", isValid, uid);
        this.io.emit("connectedUsersList", await getUsers());
      });
    });
  }
}

module.exports = Sockets;

// console.log("client connected", isValid, uid);
// socket.on("messageToServer", (data) => {
//   console.log(data);
//   //send message only to the same socket
//   // socket.emit("messageFromServer", data);
//   //send message to all sockets connected to io instance
//   this.io.emit("messageFromServer", data);
// });

// socket.on("typing", (data) => {
//   this.io.emit("typingFromServer", data);
// });
