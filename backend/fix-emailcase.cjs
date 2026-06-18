const fs = require('fs');
const path = 'server.js';
let content = fs.readFileSync(path, 'utf8');

// Normalize email immediately after destructuring in signup
content = content.replace(
  "const { firstName, middleName, lastName, email, password } = req.body;",
  "const { firstName, middleName, lastName, password } = req.body;\n    const email = req.body.email.trim().toLowerCase();"
);

// Normalize email in login route
content = content.replace(
  "app.post('/api/auth/login', async (req, res) => {\n  try {\n    const { email, password } = req.body;",
  "app.post('/api/auth/login', async (req, res) => {\n  try {\n    const email = req.body.email.trim().toLowerCase();\n    const { password } = req.body;"
);

fs.writeFileSync(path, content);
console.log('Done: email normalized at signup and login');
