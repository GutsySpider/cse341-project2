const router = require("express").Router();

const vehiclesController = require("../controllers/vehicles");
const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", vehiclesController.getAll);

router.get("/:id", vehiclesController.getSingle);

router.post("/", isAuthenticated, validation.saveVehicle, vehiclesController.createVehicle);

router.put("/:id", isAuthenticated, validation.saveVehicle, vehiclesController.updateVehicle);

router.delete("/:id", isAuthenticated, vehiclesController.deleteVehicle);

module.exports = router;
