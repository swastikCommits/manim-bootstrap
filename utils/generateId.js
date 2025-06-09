const crypto = require("crypto");

module.exports = () => {
  return `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
};
