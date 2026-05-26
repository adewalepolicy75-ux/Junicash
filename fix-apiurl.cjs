const fs = require('fs');
let api = fs.readFileSync('src/services/api.js', 'utf8');
api = api.replace(
  `const API_BASE = 'http://localhost:5000/api'`,
  `const API_BASE = 'https://junicash.onrender.com/api'`
);
fs.writeFileSync('src/services/api.js', api);
console.log('done');
