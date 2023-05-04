require("dotenv").config();
const express = require("express");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:3000",
  })
);


server.get("/logs",async (req,res) => {
    res.json({"name" : "masterhamza"})
})



// server listen
server.listen(1338, () => {
  console.log("server running with success...");
});
