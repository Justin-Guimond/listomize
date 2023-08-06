const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const entrySchema = new Schema(
  {
      List: {
        type: String,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Entry", entrySchema);
