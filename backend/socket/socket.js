import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});
export const getReceiversId = (receiversId) => {
  return userSocketMap[receiversId];
};
const userSocketMap = {}; //{userId:socket.id}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId != "undefinde") userSocketMap[userId] = socket.id;

  //io.emit is used to send events to all the connectd clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  // socket.on to  listen to events.can be used both on server and client side
  socket.on("disconnected", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
