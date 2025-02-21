const Car = require('../models/Car');

const getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addCar = async (req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCar = async (req, res) => {
    try {
        const { car_id } = req.params;
        const updatedCar = await Car.findOneAndUpdate(
            { car_id: Number(car_id) },
            req.body,
            { new: true }
        );

        if (!updatedCar) return res.status(404).json({ message: "Car not found" });

        res.json(updatedCar);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCar = async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getCars, addCar, updateCar, deleteCar };