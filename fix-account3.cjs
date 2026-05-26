const fs = require('fs');
let acc = fs.readFileSync('src/pages/AccountPage.jsx', 'utf8');
acc = acc.replace(
  `  const [hideBalance, setHideBalance] = useState(false)
  const [darkMode, setDarkMode] = useState(false)`,
  ``
);
fs.writeFileSync('src/pages/AccountPage.jsx', acc);
console.log('done');
