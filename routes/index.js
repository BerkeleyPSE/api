const express = require('express');

// local
const { catchErrors } = require('../handlers/errorHandlers');

// controllers
const brotherController = require('../controllers/brotherController');
const fulltimeController = require('../controllers/fulltimeController');

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
router.get('/brothers/filter', catchErrors(brotherController.filterBrothers));

router.get(
  '/careers/fulltime/all',
  catchErrors(fulltimeController.getAllFulltimes)
);
router.get(
  '/careers/fulltime/filter',
  catchErrors(fulltimeController.filterFulltimes)
);

module.exports = router;
