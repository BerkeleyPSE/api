const iU = require('lodash/isUndefined');
const iE = require('lodash/isEmpty');

exports.isNotValid = x => iU(x) || iE(x);
exports.isValid = x => !(iU(x) || iE(x));
exports.iE = iE;
exports.iU = iU;

exports.isValidToSave = x => !(iU(x) || iE(x) || x === 'N/A');

exports.getFields = req => {
  if (iU(req.query.fields) || iE(req.query.fields)) return '';
  return req.query.fields
    .split(',')
    .map(f => f.trim())
    .join(' ');
};

exports.dump = x => JSON.stringify(x, null, 2);
