const express = require('express');
const router = express.Router();
const { getLogs, saveLog} = require('../controllers/journalController');


router.get('/', getLogs);
router.post('/', saveLog);

module.exports = router;