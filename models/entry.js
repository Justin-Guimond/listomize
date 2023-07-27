const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const entrySchema = new Schema(
  {
    details: {
      AIModel: {
        type: String,
        required: true,
      },
      DevelopedBy: {
        type: String,
        required: true,
      },
      ReleasedDate: {
        type: Date,
        required: true,
      },
      Pros: {
        type: String,
        required: true,
      },
      Cons: {
        type: String,
        required: true,
      },
      entry: {
        type: String,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      tryURL: {
        type: String,
        required: false,
      },
      imgURL: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Entry", entrySchema);
