function mdb() {
    require("dotenv").config()
    const mongoose = require("mongoose")
    mongoose.set("strictQuery", false)
    mongoose.connect(process.env.mdb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const cluster = mongoose.connection;
    cluster.once("open", () => {
        console.log("Express Cluster ready for operations....");
    })
    cluster.on("error", (err) => {
        console.log("error : " + err);
    })
}

module.exports = { mdb }