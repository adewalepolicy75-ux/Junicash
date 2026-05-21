const fs = require('fs');
let send = fs.readFileSync('src/pages/SendPage.jsx', 'utf8');
send = send.replace(
  `{ icon: 'í¿¦', title: 'JuniCash to JuniCash'`,
  `{ icon: 'J', title: 'JuniCash to JuniCash'`
);
send = send.replace(
  `{ icon: 'â†—', title: 'Send to Any Bank Account'`,
  `{ icon: 'â†’', title: 'Send to Any Bank Account'`
);
fs.writeFileSync('src/pages/SendPage.jsx', send);
console.log('done');
