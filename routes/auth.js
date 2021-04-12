const { Router } = require('express');
const { check } = require('express-validator');
const { create_user, user_login, renew_token } = require('../controllers/auth');
const { validate_fields } = require('../middlewares/validate-fields');
const { validate_jwt } = require('../middlewares/validate-jwt');

const router = Router();

// Create new user
router.post('/new',[
    // Express validators - adds an error to request
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'password is required').isLength({min: 6}),
    validate_fields
], create_user);

// User login
router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({min: 6}),
    validate_fields
], user_login);

// Validate - Renew token
router.get('/renew', [
    validate_jwt
], renew_token);


module.exports = router;