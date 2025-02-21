const express = require('express');
const { getDealerships } = require('../controllers/dealershipController');

const router = express.Router();

router.get('/', getDealerships);

module.exports = router;