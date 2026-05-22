const router = require('express').Router();

const competitorsController = require('../controllers/competitors');
const validation = require('../middleware/validate');

router.get('/', competitorsController.getAll);

router.get('/:id', competitorsController.getSingle);

router.post('/', validation.saveCompetitor, competitorsController.createCompetitor);

router.put('/:id', validation.saveCompetitor, competitorsController.updateCompetitor);

router.delete('/:id', competitorsController.deleteCompetitor);

module.exports = router;