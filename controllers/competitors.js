const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Competitors']
  try {
    const competitors = await mongodb
      .getDatabase()
      .db()
      .collection("competitors")
      .find()
      .toArray();

    res.status(200).json(competitors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Competitors']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid competitor id to find competitor.");
  }
  try {
    const competitorId = new ObjectId(req.params.id);

    const competitor = await mongodb
      .getDatabase()
      .db()
      .collection("competitors")
      .findOne({ _id: competitorId });

    res.status(200).json(competitor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCompetitor = async (req, res) => {
  //#swagger.tags=['Competitors']
  const competitor = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    weight: req.body.weight,
    beltColor: req.body.beltColor,
    gym: req.body.gym,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("competitors")
    .insertOne(competitor);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the competitor.",
      );
  }
};

const updateCompetitor = async (req, res) => {
  //#swagger.tags=['Competitors']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid competitor id to find competitor.");
  }
  const competitorId = new ObjectId(req.params.id);
  const competitor = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    weight: req.body.weight,
    beltColor: req.body.beltColor,
    gym: req.body.gym,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("competitors")
    .replaceOne({ _id: competitorId }, competitor);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the competitor.",
      );
  }
};

const deleteCompetitor = async (req, res) => {
  //#swagger.tags=['Competitors']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid competitor id to find competitor.");
  }
  const competitorId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("competitors")
    .deleteOne({ _id: competitorId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the competitor.",
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  createCompetitor,
  updateCompetitor,
  deleteCompetitor,
};
