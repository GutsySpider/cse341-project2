const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Home Page']
    res.send('Project 2 Home Page');
});

router.use('/vehicles', require('./vehicles'));

router.use('/competitors', require('./competitors'));

module.exports = router;