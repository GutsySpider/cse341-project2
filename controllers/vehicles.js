const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Vehicles']
  try {
    const vehicles = await mongodb
      .getDatabase()
      .db()
      .collection("vehicles")
      .find()
      .toArray();

    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Vehicles']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid vehicle id to find vehicle.");
  }
  try {
    const vehicleId = new ObjectId(req.params.id);

    const vehicle = await mongodb
      .getDatabase()
      .db()
      .collection("vehicles")
      .findOne({ _id: vehicleId });

    res.status(200).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createVehicle = async (req, res) => {
  //#swagger.tags=['Vehicles']
  const vehicle = {
    make: req.body.make,
    model: req.body.model,
    color: req.body.color,
    fuel: req.body.fuel,
    price: req.body.price,
    milesOrHours: req.body.milesOrHours,
    type: req.body.type,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("vehicles")
    .insertOne(vehicle);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the vehicle.",
      );
  }
};

const updateVehicle = async (req, res) => {
  //#swagger.tags=['Vehicles']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid vehicle id to find vehicle.");
  }
  const vehicleId = new ObjectId(req.params.id);
  const vehicle = {
    make: req.body.make,
    model: req.body.model,
    color: req.body.color,
    fuel: req.body.fuel,
    price: req.body.price,
    milesOrHours: req.body.milesOrHours,
    type: req.body.type,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("vehicles")
    .replaceOne({ _id: vehicleId }, vehicle);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the vehicle.",
      );
  }
};

const deleteVehicle = async (req, res) => {
  //#swagger.tags=['Vehicles']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid vehicle id to find vehicle.");
  }
  const vehicleId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("vehicles")
    .deleteOne({ _id: vehicleId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the vehicle.",
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
