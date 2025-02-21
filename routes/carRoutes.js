const express = require('express');
const { getCars, addCar, updateCar, deleteCar } = require('../controllers/carController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getCars);
router.post('/', authMiddleware(['dealership']), addCar);
router.put('/:car_id', authMiddleware(['dealership']), updateCar);
router.delete('/:car_id', authMiddleware(['dealership']), deleteCar);

module.exports = router;