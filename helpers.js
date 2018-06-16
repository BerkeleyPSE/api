const iE = require('lodash/isEmpty');
const iU = require('lodash/isUndefined');

exports.isNotValid = x => iU(x) || iE(x);
exports.iE = iE;
exports.iU = iU;
