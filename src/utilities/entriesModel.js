const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema(
  {
    // Your entry schema definition here
    details: {
      // ...
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Entry', entrySchema);
