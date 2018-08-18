const express = require('express');

const { catchErrors } = require('../handlers/errorHandlers');
const controller = require('../controllers/coffeeChat');
const rL = require('../handlers/requireLogin');
const aCE = require('../handlers/assertCanEdit');
const addCors = require('../handlers/addCors');

const router = express.Router();

/*** INTERNAL API ***/
router.get('/', rL, aCE, catchErrors(controller.getAll));
router.get('/view/:id', rL, aCE, catchErrors(controller.view));
router.get('/delete/:id', rL, aCE, catchErrors(controller.deleteById));

/*** EXTERNAL API ***/
router.post('/add', addCors, catchErrors(controller.create));

module.exports = router;
