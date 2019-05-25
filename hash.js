const crypto = require('crypto');

function hashPassword(pass) {
  let hash = crypto.createHash('sha256');
  hash.update(pass);
  return hash.digest('hex');
}

module.exports = { hashPassword };