const Entry = require('../../models/entry');

module.exports = {
    create,
    index
  };


async function index(req, res) {
const entries = await Entry.find({});
res.json(entries);
}

async function create(req, res) {
  const entries = await Note.create(req.body);
  res.json(entries);
}
