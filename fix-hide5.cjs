const fs = require('fs');

// Fix SummaryCards
let cards = fs.readFileSync('src/components/SummaryCards.jsx', 'utf8');
cards = cards.replace(
  `{hideBalance && card.isAmount ? '••••' : card.isAmount ? format(card.value) : card.value}`,
  `{hideBalance && card.isAmount ? '****' : card.isAmount ? format(card.value) : card.value}`
);
fs.writeFileSync('src/components/SummaryCards.jsx', cards);

// Fix Dashboard recent transactions
let dash = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');
dash = dash.replace(
  `{hideBalance ? '••••' : (tx.type === 'income' ? '+' : '-') + formatAmount(tx.amount)}`,
  `{hideBalance ? '****' : (tx.type === 'income' ? '+' : '-') + formatAmount(tx.amount)}`
);
fs.writeFileSync('src/pages/Dashboard.jsx', dash);

console.log('done');
