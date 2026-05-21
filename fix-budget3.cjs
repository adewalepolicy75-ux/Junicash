const fs = require('fs');
let budget = fs.readFileSync('src/pages/BudgetPage.jsx', 'utf8');
budget = budget.replace(
  `const COLORS = ['#6d28d9', '#8b5cf6', '#a78bfa', '#059669', '#dc2626', '#f59e0b', '#0891b2', '#ec4899']`,
  `const COLORS = ['#6d28d9', '#059669', '#f59e0b', '#0891b2', '#ec4899', '#dc2626', '#f97316', '#14b8a6']`
);
budget = budget.replace(
  `const LIMITS = {
  Food: 50000,
  Transport: 30000,
  Housing: 150000,
  Entertainment: 20000,
  Health: 40000,
  Shopping: 60000,
  Utilities: 25000,
  Other: 20000,
}`,
  `const LIMITS = {
  Food: { limit: 50000, color: '#f97316' },
  Transport: { limit: 30000, color: '#0891b2' },
  Housing: { limit: 150000, color: '#6d28d9' },
  Entertainment: { limit: 20000, color: '#ec4899' },
  Health: { limit: 40000, color: '#059669' },
  Shopping: { limit: 60000, color: '#f59e0b' },
  Utilities: { limit: 25000, color: '#14b8a6' },
  Other: { limit: 20000, color: '#8b5cf6' },
}`
);
budget = budget.replace(
  `  Object.entries(LIMITS).map(([category, limit], i) => {
            const spent = byCategory[category] || 0
            const percent = Math.min((spent / limit) * 100, 100)
            const over = spent > limit
            const color = over ? '#dc2626' : percent > 75 ? '#f59e0b' : '#6d28d9'`,
  `  Object.entries(LIMITS).map(([category, { limit, color: catColor }], i) => {
            const spent = byCategory[category] || 0
            const percent = Math.min((spent / limit) * 100, 100)
            const over = spent > limit
            const color = over ? '#dc2626' : percent > 75 ? '#f59e0b' : catColor`
);
budget = budget.replace(
  `formatAmount(spent)} / {formatAmount(limit)}`,
  `formatAmount(spent)} / {formatAmount(limit)}`
);
fs.writeFileSync('src/pages/BudgetPage.jsx', budget);
console.log('done');
