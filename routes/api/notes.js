const express = require('express');
const router = express.Router();

const notesCtrl = require('../../controllers/api/notes');

// All paths start with '/api/users'

// POST /api/users (create a user - sign up)
router.get('/', notesCtrl.index);

module.exports = router;