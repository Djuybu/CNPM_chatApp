import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { log } from "console";

const app = express(); // Initialize Express app
const server = http.createServer(app); // Create HTTP server

app.use(cors()); // Enable CORS middleware

const io = new Server(server, {
  // Initialize Socket.IO server
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} has connected!`);

  //send message
  socket.on("send_message", (data) => {
    const room = data.roomID;
    console.log(room);
    socket.broadcast.to(room.roomID).emit("receive", data.chat);
  });

  socket.on("join", (roomID) => {
    console.log(roomID);
    socket.join(roomID); // Join the room
    console.log(
      `Joined successful! ID: ${socket.id} and the room id: ${roomID}`
    );
  });
});

server.listen(5500, () => {
  console.log("LO CON CACCC"); // Log server startup message
});
