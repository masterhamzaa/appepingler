const mongoose = require("mongoose");

const PostitSchema = new mongoose.Schema(
  {
    id:{required:true,type:String},
    postit: { required: true, type: String },
    userId :{type:String}
  },
  { collection: "postits" }
);

module.exports = mongoose.model("postits", PostitSchema);
