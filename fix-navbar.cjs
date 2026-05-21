const fs = require('fs');
let nav = fs.readFileSync('src/components/Navbar.jsx', 'utf8');
nav = nav.replace(
  `{ icon: <FiPieChart size={16} />, label: 'Budget', tab: 'budget' }`,
  `{ icon: <FiPieChart size={16} />, label: 'Summary', tab: 'budget' }`
);
fs.writeFileSync('src/components/Navbar.jsx', nav);
console.log('done');
