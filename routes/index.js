const router = require('express').Router();
const passport = require('passport');


router.use('/', require('./swagger'));

// router.get('/', (req, res) => {
//     //#swagger.tags=['Home Page']
//     res.send('Project 2 Home Page');
// });

router.use('/vehicles', require('./vehicles'));

router.use('/competitors', require('./competitors'));

router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
    });
});

module.exports = router;