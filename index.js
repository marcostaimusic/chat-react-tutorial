//express server
const express = require("express");
const { Socket } = require("socket.io");
const app = express();
//socket server
const server = require("http").createServer(app);
//socket server config
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/public"));

//the socket is the client connecting to the server
io.on("connection", (socket) => {
  console.log(socket.id);

  //   socket.emit("welcomeMsg", { msg: "hello world", date: new Date() });

  socket.on("messageToServer", (data) => {
    console.log(data);
    //send message only to the same socket
    // socket.emit("messageFromServer", data);
    //send message to all sockets connected to io instance
    io.emit("messageFromServer", data);
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`$Server listening on port ${port}`);
});
