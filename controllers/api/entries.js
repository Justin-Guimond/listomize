const Entry = require('../../models/entry');
module.exports = {
    create,
    index,
    edit,
    delete: deleteDay,
    show
};
async function index(req, res) {
    const entries = await Entry.find({});
    res.json(entries);
}
async function create(req, res) {
    const entry = await Entry.create(req.body);
    res.json(entry);
}

async function edit(req, res) {
    try {
        const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEntry);
    } catch (error) {
        res.status(500).json({ message: 'Error updating the entry' });
    }
}

async function deleteDay(req, res) {
    try {
        await Entry.findByIdAndRemove(req.params.id);
        res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the entry' });
    }
}

async function show(req, res) {
    const entries = await Entry.findById(req.params.id);
    res.json(entries);
}