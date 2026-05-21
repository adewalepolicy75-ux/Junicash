const fs = require('fs');
let budget = fs.readFileSync('src/pages/BudgetPage.jsx', 'utf8');
budget = budget.replace(
  `          <div style={{ textAlign: 'center', padding: '3rem 0', color: '#9ca3af' }}>
              <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</p>
              <p>No expenses this month yet</p>
            </div>`,
  `          <div style={{ textAlign: 'center', padding: '3rem 0', color: '#9ca3af' }}>
              <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>( - )</p>
              <p>No expenses this month yet</p>
            </div>`
);
fs.writeFileSync('src/pages/BudgetPage.jsx', budget);
console.log('done');
