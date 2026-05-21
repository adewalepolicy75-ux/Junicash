const fs = require('fs');

let login = fs.readFileSync('src/pages/Login.jsx', 'utf8');
login = login.replace("to='/login'", "to='/'");
fs.writeFileSync('src/pages/Login.jsx', login);

let signup = fs.readFileSync('src/pages/Signup.jsx', 'utf8');
signup = signup.replace("to='/login'", "to='/'");
fs.writeFileSync('src/pages/Signup.jsx', signup);

console.log('done');
