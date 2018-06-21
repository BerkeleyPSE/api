const express = require('express');

// local
const { catchErrors } = require('../handlers/errorHandlers');
const controller = require('../controllers/user');
const rL = require('../handlers/requireLogin');
const aCE = require('../handlers/assertCanEdit');

const router = express.Router();

/*** INTERNAL API ***/
router.get('/', rL, catchErrors(controller.get));
router.get('/view/:id', rL, catchErrors(controller.view));

module.exports = router;
