const express = require('express');

// local
const { catchErrors } = require('../handlers/errorHandlers');

// controllers
const brotherController = require('../controllers/brotherController');
const fulltimeController = require('../controllers/fulltimeController');

const router = express.Router();

/*** INTERNAL AND EXTERNAL API ***/
router.get('/brothers/all', catchErrors(brotherController.getAllBrothers));

/*** INTERNAL API ***/
router.get('/', (req, res) => res.render('index'));
router.get('/brothers', catchErrors(brotherController.getBrothers));
router.get('/brothers/add', (req, res) => res.render('brotherEdit'));
// TODO:: add requireLogin and canEdit middleware after passport is implemented
router.post('/brothers/add', catchErrors(brotherController.createBrother));
router.get(
  '/brothers/edit/:id',
  catchErrors(brotherController.updateBrotherById)
);
router.post('/brothers/edit/:id', catchErrors(brotherController.updateBrother));
router.get('/brothers/view/:id', catchErrors(brotherController.viewBrother));
router.get(
  '/brothers/delete/:id',
  catchErrors(brotherController.deleteBrother)
);

/*** EXTERNAL API ***/
router.get(
  '/brothers/executives',
  catchErrors(brotherController.getExecutives)
);
router.get('/brothers/id/:id', catchErrors(brotherController.getBrotherById));
router.get(
  '/brothers/key/:key',
  catchErrors(brotherController.getBrotherByKey)
);
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
