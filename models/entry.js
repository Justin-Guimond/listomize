const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    entry: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref:'User'},
  }, {
    timestamps: true
  })
  

module.exports = mongoose.model('Entry', noteSchema);