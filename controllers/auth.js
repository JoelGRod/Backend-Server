const { response } = require('express'); // types
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { create_jwt } = require('../helpers/jwt')
// const { validationResult } = require('express-validator');

const create_user = async (req, res = response) => {

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

    try {
        // Verify that the email does not exist
        // let user = await User.findOne({ email }); 
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists'
            });
        };

        // Create user with model
        const user_db = new User(req.body);

        // Encrypt/hash password
        const salt = bcrypt.genSaltSync();  // Default 10 rounds
        user_db.password = bcrypt.hashSync(password, salt);

        // Generate Json Web Token (this is not saved in database)
        const token = await create_jwt(user_db.id, user_db.name);

        // Create user in DB
        await user_db.save();

        // Successful response
        return res.status(201).json({
            ok: true,
            uid: user_db.id,
            name: user_db.name,
            token: token
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
}

const user_login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        // User exists? (email)
        const user_db = await User.findOne({ email });

        if (!user_db) {
            return res.status(400).json({
                ok: false,
                msg: 'Wrong credentials - Username does not exist' // In production change msg to 'Wrong credentials' for security reasons
            });
        }

        // Is the password correct??
        const is_correct_password = bcrypt.compareSync(password, user_db.password);

        if (!is_correct_password) {
            return res.status(400).json({
                ok: false,
                msg: 'Wrong credentials - Wrong password' // In production change msg to 'Wrong credentials' for security reasons
            });
        }

        // Generate JWT
        const token = await create_jwt(user_db.id, user_db.name);

        // Successful response
        return res.status(201).json({
            ok: true,
            uid: user_db.id,
            name: user_db.name,
            token: token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
}

const renew_token = async (req, res) => {

    const { uid, name } = req.user_data;

    try {
        // Generate JWT
        const token = await create_jwt(uid, name);
        // Successful response
        return res.json({
            ok: true,
            msg: 'Renew',
            name: name,
            uid: uid,
            token: token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }

}


module.exports = {
    create_user,
    user_login,
    renew_token
}