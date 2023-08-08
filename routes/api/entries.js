const express = require('express');
const router = express.Router();
const entriesCtrl = require('../../controllers/api/entries');
// All paths start with '/api/entries'
router.get('/', entriesCtrl.index);
router.get('/search/:search', entriesCtrl.search);
router.get('/:id', entriesCtrl.show);
router.post('/', entriesCtrl.create);
router.put('/:id', entriesCtrl.edit);
router.delete('/delete/:id', entriesCtrl.delete);
module.exports = router;












