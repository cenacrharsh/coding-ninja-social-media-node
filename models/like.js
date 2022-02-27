const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
    },
    //! this defines the object id of the liked object
    likeable: {
      type: mongoose.Schema.ObjectId,
      required: true,
      refPath: "onModule",
    },
    //! this field is used for defining the type of the liked object since this is a dynamic reference
    onModel: {
      type: String,
      required: true,
      enum: [
        "Post",
        "Comment",
      ] /* if we remove this then parent can be anything, but we want to restrict it to post and comments */,
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
