const express = require('express');

const router = express.Router();

// TODO: add pages for about, getting started, useful links, etc.
router.get('/', (req, res) => res.render('index'));

module.exports = router;
