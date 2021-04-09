const { response } = require('express'); // types
// const { validationResult } = require('express-validator');

const create_user = (req, res = response) => {

    // // ------------------------------------------------------ //
    // // get errors in request from express validators middleware
    // const errors = validationResult( req );
    // if(!errors.isEmpty()) {
    //     return res.status(400).json({
    //         ok: false,
    //         msg: errors.mapped()
    //     });
    // }
    // // ------------------------------------------------------ //

    const { name, email, password } = req.body;

    return res.json({
        ok: true,
        msg: 'Create user'
    });
};

const user_login = (req, res = response) => {
    
    const { email, password } = req.body;

    return res.json({
        ok: true,
        msg: 'Login user'
    });
};

const renew_token = (req, res) => {
    return res.json({
        ok: true,
        msg: 'Renew'
    });
};


module.exports = {
    create_user,
    user_login,
    renew_token
}