class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    //the socket is the client connecting to the server
    this.io.on("connection", (socket) => {
      console.log(socket.id);

      //   socket.emit("welcomeMsg", { msg: "hello world", date: new Date() });

      socket.on("messageToServer", (data) => {
        console.log(data);
        //send message only to the same socket
        // socket.emit("messageFromServer", data);
        //send message to all sockets connected to io instance
        this.io.emit("messageFromServer", data);
      });
    });
  }
}

module.exports = Sockets;
