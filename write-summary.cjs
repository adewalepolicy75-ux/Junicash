const fs = require('fs');
const code = `function SummaryCards({ transactions, hideBalance }) {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const monthlyTx = transactions.filter(tx => {
    const d = new Date(tx.date)
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear
  })

  const income = monthlyTx.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + Number(tx.amount), 0)
  const expense = monthlyTx.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + Number(tx.amount), 0)
  const balance = income - expense

  const format = (val) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(val)

  const cards = [
    { label: 'Total Balance', value: balance, color: '#0a0a0f', isAmount: true },
    { label: 'Monthly Income', value: income, color: '#059669', isAmount: true },
    { label: 'Monthly Expenses', value: expense, color: '#dc2626', isAmount: true },
    { label: 'Transactions', value: monthlyTx.length, color: '#8b5cf6', isAmount: false },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
      {cards.map((card) => (
        <div key={card.label} style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '1.25rem 1.5rem' }}>
          <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', marginBottom: '0.5rem' }}>
            {card.label}
          </p>
          <p style={{ fontSize: '1.7rem', fontWeight: '700', color: card.color }}>
            {hideBalance && card.isAmount ? '••••' : card.isAmount ? format(card.value) : card.value}
          </p>
        </div>
      ))}
    </div>
  )
}

export default SummaryCards`;
fs.writeFileSync('src/components/SummaryCards.jsx', code);
console.log('done');
