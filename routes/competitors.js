const router = require('express').Router();

const competitorsController = require('../controllers/competitors');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', competitorsController.getAll);

router.get('/:id', competitorsController.getSingle);

router.post('/', isAuthenticated, validation.saveCompetitor, competitorsController.createCompetitor);

router.put('/:id', isAuthenticated, validation.saveCompetitor, competitorsController.updateCompetitor);

router.delete('/:id', isAuthenticated, competitorsController.deleteCompetitor);

module.exports = router;