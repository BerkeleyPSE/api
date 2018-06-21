const express = require('express');

const { catchErrors } = require('../handlers/errorHandlers');
const controller = require('../controllers/regform');
const rL = require('../handlers/requireLogin');
const aCE = require('../handlers/assertCanEdit');

const router = express.Router();

router.get('/', rL, aCE, catchErrors(controller.getAll));
router.get('/view/:id', rL, aCE, catchErrors(controller.view));
router.get('/delete/:id', rL, aCE, catchErrors(controller.deleteById));

module.exports = router;
