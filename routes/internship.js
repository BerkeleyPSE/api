const express = require('express');

// local
const { catchErrors } = require('../handlers/errorHandlers');
const controller = require('../controllers/internship');
const rL = require('../handlers/requireLogin');
const aCE = require('../handlers/assertCanEdit');
const addCors = require('../handlers/addCors');

const router = express.Router();

/*** INTERNAL API ***/
router.get('/', rL, catchErrors(controller.getAllInt));
router.get('/add', rL, aCE, (req, res) =>
  res.render('dataForm', { type: 'internships', disabled: false })
);
router.post('/add', rL, aCE, catchErrors(controller.create));
router.get('/view/:id', rL, catchErrors(controller.view));
router.get('/edit/:id', rL, aCE, catchErrors(controller.update));
router.post('/edit/:id', rL, aCE, catchErrors(controller.updateById));
router.get('/delete/:id', rL, aCE, catchErrors(controller.deleteById)); // router.delete(...) returns a 404 for some reason

/*** EXTERNAL API ***/
router.get('/all', addCors, catchErrors(controller.getAllExt));
router.get('/filter', addCors, catchErrors(controller.filter));

module.exports = router;
