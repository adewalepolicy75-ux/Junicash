const fs = require('fs');
let user = fs.readFileSync('models/User.js', 'utf8');
user = user.replace(
  `  balance: { type: Number, default: 0 },`,
  `  balance: { type: Number, default: 0 },
  pin: { type: String, default: null },`
);
fs.writeFileSync('models/User.js', user);
console.log('done');
