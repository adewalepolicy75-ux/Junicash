const fs = require('fs');
let dash = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');
dash = dash.replace(
  `<SummaryCards transactions={transactions} />`,
  `<SummaryCards transactions={transactions} hideBalance={hideBalance} />`
);
fs.writeFileSync('src/pages/Dashboard.jsx', dash);
console.log('done');
