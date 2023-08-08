const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listSchema = new Schema({
  list: {
    type: String,
    minlength: 1,
    unique: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
      ref: "User",
  },
}, { timestamps: true });

const itemSchema = new Schema({
  list_id: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true,
  },
  item1: {
    type: String,
    minlength: 1,
    required: true,
  },
  // item2: {
  //   type: String,
  //   minlength: 1,
  //   required: true,
  // },
  user: {
    type: Schema.Types.ObjectId,
      ref: "User",
  },
}, { timestamps: true });


const List = mongoose.model('List', listSchema);
const Item = mongoose.model('Item', itemSchema);

module.exports = {
  List,
  Item,
};