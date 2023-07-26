const Entry = require('../../models/entry');

module.exports = {
    create,
    index,
    delete: deleteDay
  };


async function index(req, res) {
const entries = await Entry.find({});
res.json(entries);
}

async function create(req, res) {
  const entries = await Entry.create(req.body);
  res.json(entries);
}

async function deleteDay(req, res) {
    const entry = await Entry.findByIdAndRemove(req.params.id);
    res.json({message: 'Entry deleted successfully'});
};