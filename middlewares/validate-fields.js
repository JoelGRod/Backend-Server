const { response } = require("express");
const { validationResult } = require("express-validator");

const validate_fields = ( req, res = response, next ) => {
    // ------------------------------------------------------ //
    // get errors in request from express validators middleware
    const errors = validationResult( req );
    if(!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()
        });
    }

    next();
    // ------------------------------------------------------ //

};

module.exports = {
    validate_fields
}