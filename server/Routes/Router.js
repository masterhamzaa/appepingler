const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

// rabbitmq
const amqp = require("amqplib");
let connection, tunnel;
const queue_usernames = "username";
const queue_logs = 'service_email_hamza';
//const queue3 = process.env.tokenservice

async function connecttorabbit() {
  const server = "amqp://guest:guest@localhost:5672";
  connection = await amqp.connect(server);
  tunnel = await connection.createChannel();
  //service of usernames
  await tunnel.assertQueue(queue_usernames);
  //service of logs
  await tunnel.assertQueue(queue_logs);

}

connecttorabbit().then(() => {
  tunnel.consume(queue_usernames, (data2) => {
    console.log("connected username =>  " + data2.content.toString());
    user = data2.content.toString()
    tunnel.ack(data2)
  })
})



// Pass
const { verifyToken } = require("../core");
const middleware = verifyToken;
express().use(middleware);

// models
const PostitModel = require("../Models/Postit");
const UserModel = require("../Models/User");



// routes
router.post("/register", async (req, res) => {

  let exist = false;
  const data = await req.body;
  if (data) {
    if ((await UserModel.findOne({ email: data.email })) == undefined || null) {
      const obj = new UserModel({
        fullName: req.body.fullName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      });
      await obj.save();
      res.json({ "success": "success" })
    } else exist = true;
  } else exist = true;
  if (exist) res.json({ "exist": "exist deja" });
});

router.post("/login", async (req, res) => {
  let error = false;
  const data = await req.body;
  if (data) {
    const query = await UserModel.findOne({ email: data.email });
    if (query !== undefined || null) {
      if (!query) error = true;
      if (query) {
        if (bcrypt.compareSync(data.password, query.password)) {
          const token = jwt.sign({ user: data.email }, process.env.decodekey, {expiresIn: "3600s"});
          res.json({ message: "successful login", token: token });
          tunnel.sendToQueue(queue_usernames, Buffer.from(query.fullName));
          let today = new Date()
          tunnel.sendToQueue(queue_logs,Buffer.from(
            JSON.stringify(
              {
                fullname : query.fullName,
                nbPostit: await PostitModel.find({ userId: query.email}).count(),
                loginAt : today.toLocaleDateString(undefined,{
                  weekday: 'long',
                  day: '2-digit', 
                  month: '2-digit', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                }),
              }
            ))
          )

          error = false;
        } else error = true;
      }
    } else error = true;
  }
  if (error) res.json({ err: "error" })
});



router.get("/postits/:userid", middleware, async (req, res) => {
  try {
    const data = await PostitModel.find(
      { userId: req.params.userid },
      { _id: 0 }
    );
    res.json({ "username": user, "data": data });
  } catch (err) {
    res.json({ err: err.message });
  }
});

router.post("/postit/add", middleware, async (req, res) => {
  const obj = new PostitModel({
    id: uuid.v4(),
    postit: req.body.postit,
    userId: req.body.userId,
  });

  try {
    const data = await obj.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

router.delete("/allpostits/:userid", middleware, async (req, res) => {
  try {
    const obj = await PostitModel.deleteMany({ userId: req.params.userid });
    res.send(obj);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
