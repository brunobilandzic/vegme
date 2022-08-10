const { Server } = require("socket.io");

const createIo = (httpsServer) => {
  const io = new Server(httpsServer, {
    cors: {
      origin: "https://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    // send a message to the client
    socket.emit("socket connected", {firstMessage: "first message"}, { message: "Hello From Server" });

 
    // receive a message from the client
    socket.on("message from client", () => {
      console.log("Client message");
  })

  });

  return io;
};

module.exports = {
  createIo,
};