const validator = require('../helpers/validate');

const saveVehicle = (req, res, next) => {
    const validationRule = {
        make: 'required|string',
        model: 'required|string',
        color: 'required|string',
        fuel: 'required|string',
        price: 'required|integer',
        milesOrHours: 'required|integer',
        type: 'required|string'

    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveCompetitor = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        phone: 'required|phone',
        weight: 'required|integer',
        beltColor: 'required|string',
        gym: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveVehicle,
    saveCompetitor
};