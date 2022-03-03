//# Server Side

module.exports.chatSockets = function (socketServer) {
  const io = require("socket.io")(socketServer);

  //* whenever a connection request is received it automatically sends acknowledgement to the frontend user who estb the connetion
  io.sockets.on("connection", function (socket) {
    console.log("New Connection Received: ", socket.id);

    //> whenever client disconnects, automatic disconnect event is fired
    socket.on("disconnect", function () {
      console.log("Socket Disconnected");
    });
  });
};
