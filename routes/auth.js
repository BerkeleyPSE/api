// node modules
const passport = require('passport');
const express = require('express');

// local
const controller = require('../controllers/auth.js');
const rL = require('../handlers/requireLogin');
const aCE = require('../handlers/assertCanEdit');

const router = express.Router();

router.get('/google', controller.login);
router.get('/google/callback', controller.loginCallback);
router.get('/logout', rL, controller.logout);
router.get('/self', rL, controller.getSelf);

module.exports = router;
