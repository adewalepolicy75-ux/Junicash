const fs = require('fs');
let budget = fs.readFileSync('src/pages/BudgetPage.jsx', 'utf8');
budget = budget.replace(
  `                <div style={{ background: '#f3f4f6', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                  <div style={{ width: percent + '%', height: '100%', background: barColor, borderRadius: '999px', transition: 'width 0.5s ease' }} />
                </div>`,
  `                <div style={{ background: '#f3f4f6', borderRadius: '999px', height: '10px', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ width: percent + '%', height: '100%', background: barColor, borderRadius: '999px', transition: 'width 0.5s ease', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '4px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                  <span style={{ fontSize: '0.7rem', color: barColor, fontWeight: '700' }}>{percent.toFixed(1)}% used</span>
                  {over && <span style={{ fontSize: '0.7rem', color: '#dc2626', fontWeight: '700' }}>₦{(spent - limit).toLocaleString()} over budget!</span>}
                  {!over && <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>₦{(limit - spent).toLocaleString()} left</span>}
                </div>`
);
fs.writeFileSync('src/pages/BudgetPage.jsx', budget);
console.log('done');
