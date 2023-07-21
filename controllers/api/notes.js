const {Note} = require ("../../models/user");

module.exports = {
  index,
  create
};

async function index(req, res) {
    const notes = await Note.find({});
    res.json(notes);
  }
