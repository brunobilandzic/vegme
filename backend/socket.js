const { Server } = require("socket.io");

const createIo = (httpsServer) => {
  const io = new Server(httpsServer, {
    cors: {
      origin: "https://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    // send a message to the client

    // receive a message from the client
    socket.on("log-in", (userWithRoles) => {
      const userSocket = {
        id: userWithRoles.id,
        roles: userWithRoles.roles,
        socketId: socket.id,
      };
      if (io.onlineUsers === undefined) {
        io.onlineUsers = [
          {
            ...userSocket,
            socketIds: [userSocket.socketId],
            room: userSocket.socketId,
          },
        ];
      } else {
        if (
          io.onlineUsers?.map((uSocket) => uSocket.id).includes(userSocket.id)
        ) {
          const existingOnlineUserSocket = io.onlineUsers?.find(
            (uSocket) => uSocket.id === userSocket.id
          );
          existingOnlineUserSocket.socketIds.push(userSocket.socketId);
          socket.join(existingOnlineUserSocket.room);
          return;
        }
        io.onlineUsers.push({
          ...userSocket, 
          socketIds: [userSocket.socketId],
          room: userSocket.socketId,
        });
      }
    });
  });

  return io;
};

module.exports = {
  createIo,
};
