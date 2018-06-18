const editEmails = [
  'berkeleypse.tech@gmail.com',
  'berkeleypse.marketing@gmail.com'
];

const viewEmails = [
  'rrangnekar@berkeley.edu',
  'berkeleypse.president@gmail.com',
  'berkeleypse.recruiting@gmail.com',
  'berkeleypse.vpa@gmail.com',
  'berkeleypse.pmt@gmail.com',
  'berkeleypse.finance@gmail.com',
  'berkeleypse.hr@gmail.com',
  'berkeleypse.pd@gmail.com',
  'berkeleypse.pr@gmail.com'
];

module.exports = {
  editEmails,
  viewEmails,
  allEmails: [...editEmails, ...viewEmails]
};
