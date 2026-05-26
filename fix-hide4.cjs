const fs = require('fs');

// Fix SummaryCards
let cards = fs.readFileSync('src/components/SummaryCards.jsx', 'utf8');
cards = cards.replace(
  `            {hideBalance && !card.isCount ? '₦ ****' : card.isCount ? card.value : new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(card.value)}`,
  `            {hideBalance && !card.isCount ? <span style={{ letterSpacing: '0.1em' }}>₦ ••••</span> : card.isCount ? card.value : new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(card.value)}`
);
fs.writeFileSync('src/components/SummaryCards.jsx', cards);
console.log('SummaryCards fixed');

// Fix Dashboard recent transactions to hide amounts
let dash = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');
dash = dash.replace(
  `<p style={{ fontWeight: '700', color: tx.type === 'income' ? '#059669' : '#dc2626' }}>
                      {tx.type === 'income' ? '+' : '-'}{formatAmount(tx.amount)}
                    </p>`,
  `<p style={{ fontWeight: '700', color: tx.type === 'income' ? '#059669' : '#dc2626' }}>
                      {hideBalance ? '••••' : (tx.type === 'income' ? '+' : '-') + formatAmount(tx.amount)}
                    </p>`
);
fs.writeFileSync('src/pages/Dashboard.jsx', dash);
console.log('done');
