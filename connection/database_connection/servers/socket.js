import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { log } from "console";

const app = express(); // Initialize Express app
const server = http.createServer(app); // Create HTTP server

let user = 0;
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
  user++;
  console.log("user:", user);

  //send message
  socket.on("send_message", (data) => {
    console.log(data);
    try {
      socket.to(data.roomId).emit("receive", data);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("join", (roomID) => {
    socket.join(roomID); // Join the room
    console.log(
      `Joined successful! ID: ${socket.id} and the room id: ${roomID}`
    );
  });
});

server.listen(5500, () => {
  console.log("CODE OI ANH YEU CODE"); // Log server startup message
});
