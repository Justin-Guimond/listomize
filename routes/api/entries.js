const express = require('express');
const router = express.Router();

const entriesCtrl = require('../../controllers/api/entries');

// All paths start with '/api/entries'

router.get('/', entriesCtrl.index);
router.post('/', entriesCtrl.create);

module.exports = router;