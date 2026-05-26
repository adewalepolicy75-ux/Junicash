const fs = require('fs');

// Fix SummaryCards - pass hideBalance correctly
let cards = fs.readFileSync('src/components/SummaryCards.jsx', 'utf8');
cards = cards.replace(
  `            {hideBalance && !card.isCount ? '****' : card.isCount ? card.value : new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(card.value)}`,
  `            {hideBalance && !card.isCount ? '₦ ****' : card.isCount ? card.value : new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(card.value)}`
);
fs.writeFileSync('src/components/SummaryCards.jsx', cards);
console.log('SummaryCards fixed');

// Fix Dashboard - stop balance jumping by fixing layout
let dash = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');
dash = dash.replace(
  `<div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.5rem 0 0.25rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0a0a0f' }}>
                {hideBalance ? '₦ ****' : formatAmount(totalBalance)}
              </h2>
              <button onClick={() => setHideBalance(!hideBalance)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '0.25rem' }}>
                {hideBalance ? <FiEye size={22} /> : <FiEyeOff size={22} />}
              </button>
            </div>`,
  `<div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.5rem 0 0.25rem', minHeight: '3.5rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0a0a0f', minWidth: '200px' }}>
                {hideBalance ? '₦ ****' : formatAmount(totalBalance)}
              </h2>
              <button onClick={() => setHideBalance(!hideBalance)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '0.25rem', flexShrink: 0 }}>
                {hideBalance ? <FiEye size={22} /> : <FiEyeOff size={22} />}
              </button>
            </div>`
);
fs.writeFileSync('src/pages/Dashboard.jsx', dash);
console.log('done');
