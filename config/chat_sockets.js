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

    //> to detect user req to join chat room
    socket.on("join_room", function (data) {
      console.log("Joining Request Received", data);

      socket.join(data.chatroom);

      //* we need to tell all members of chat room, new user has joined the chatroom
      io.in(data.chatroom).emit("user_joined", data);
    });

    // CHANGE :: detect send_message and broadcast to everyone in the room
    socket.on("send_message", function (data) {
      io.in(data.chatroom).emit("receive_message", data);
    });
  });
};
