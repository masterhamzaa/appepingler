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


// rabbitmq
const amqp = require("amqplib");
let connection, tunnel;
const queue_logs = 'service_email_hamza';

async function connecttorabbit() {
    const server = "amqp://guest:guest@localhost:5672";
    connection = await amqp.connect(server);
    tunnel = await connection.createChannel();
   
}
connecttorabbit()



// models
//const LogModel = require("../Models/Log");




// routes
server.get("/logs/:user",async (req,res) => {
    /*  
        user_full_name : Hamza
        NumberOfPostists : 50
        day:
        login_time:
        logout_time: 
    */
  try {
    const data = await PostitModel.find(
      { userId: req.params.user },
      { _id: 0 }
    );
    connecttorabbit().then(()=>{
      tunnel.consume(queue_logs,(data)=>{
        console.log("logs =>  " +  data.content.toString());
      })
    })
    res.json({"username":user,"data":data});
   
  } catch (err) {
    res.json({ err: err.message });
  }
})



















// server listen
server.listen(process.env.port, () => {
  console.log("server running with success...");
});
