require("dotenv").config();
const express = require("express");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors({origin: "http://localhost:3000"}));

// mongo database
const { mdb } = require("./database/db");
mdb();

// routes
const routes = require("./Routes/Router");
server.use("/",routes);

// server listen
server.listen(process.env.port, () => {
  console.log("server running with success...");
});
