const { List, Item } = require('../../models/entry');
module.exports = {
    create,
    index,
    edit,
    delete: deleteDay,
    show,
    search
};
async function index(req, res) {
    const userId = req.user._id;
    const lists = await List.find({ user: userId });
    const items = await Item.find({ user: userId }).populate("list_id").exec();
    res.json(items);
}

async function search(req, res) {
    const userId = req.user._id;
    const listExist = await List.find({list: req.params.search, user: userId});
    if (listExist.length > 0) {const items = await Item.find({list_id: listExist[0]._id, user: userId})
        res.json(items);
    } else {
        res.json([]);
    }
}

async function create(req, res) {
    console.log(req.body, "TEST")
    console.log(req.user);
    const listExist = await List.find({list: req.body.list});
    console.log(listExist);
    if (listExist.length > 0) {
        const item = await Item.create({list_id: listExist[0]._id, item1: req.body.item, user: req.user._id})
        console.log(item);
        res.json(item);
    } else {
        const list = await List.create({list: req.body.list, user: req.user._id});
        console.log(list);
        const item = await Item.create({list_id: list._id, item1: req.body.item, user: req.user._id})
        console.log(item, list);
        res.json(item);
    }
}

async function edit(req, res) {
    try {
        const updatedEntry = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEntry);
    } catch (error) {
        res.status(500).json({ message: 'Error updating the entry' });
    }
}

async function deleteDay(req, res) {
    try {
        await Item.findByIdAndRemove(req.params.id);
        res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the entry' });
    }
}

async function show(req, res) {
    const entries = await List.findById(req.params.id);
    res.json(entries);
}