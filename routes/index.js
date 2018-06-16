const express = require('express');

// local
const { catchErrors } = require('../handlers/errorHandlers');

// controllers
const brotherController = require('../controllers/brotherController');

const router = express.Router();

router.get('/', (req, res, next) => res.render('index'));

router.get('/brothers/all', catchErrors(brotherController.getAllBrothers));
router.get('/brothers/id/:id', catchErrors(brotherController.getBrotherById));
router.get(
  '/brothers/key/:key',
  catchErrors(brotherController.getBrotherByKey)
);
// TODO:: create brother
// TODO: update brother
// TODO: delete brother
router.get('/brothers/search');
router.get('brothers/year/:year'); // TODO: create index on this
router.get('brothers/class/:class'); // TODO: create index on this

module.exports = router;
