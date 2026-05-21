const fs = require('fs');
let budget = fs.readFileSync('src/pages/BudgetPage.jsx', 'utf8');
budget = budget.replace(
  `<h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '0.5rem' }}>Budget</h2>`,
  `<h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '0.5rem' }}>Monthly Summary</h2>`
);
fs.writeFileSync('src/pages/BudgetPage.jsx', budget);
console.log('done');
