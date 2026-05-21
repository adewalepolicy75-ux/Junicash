const fs = require('fs');
const code = `import { useState } from 'react'

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterMonth, setFilterMonth] = useState('all')

  const months = [...new Set(transactions.map(tx => {
    const d = new Date(tx.date)
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0')
  }))].sort().reverse()

  const categories = [...new Set(transactions.map(tx => tx.category))]

  const filtered = transactions.filter(tx => {
    const matchType = filterType === 'all' || tx.type === filterType
    const matchCat = filterCategory === 'all' || tx.category === filterCategory
    const matchMonth = filterMonth === 'all' || (new Date(tx.date).getFullYear() + '-' + String(new Date(tx.date).getMonth() + 1).padStart(2, '0')) === filterMonth
    return matchType && matchCat && matchMonth
  }).sort((a, b) => new Date(b.date) - new Date(a.date))

  const totalIncome = filtered.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + Number(tx.amount), 0)
  const totalExpense = filtered.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + Number(tx.amount), 0)

  const formatAmount = (amount) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount)

  const select = { background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#0a0a0f', padding: '0.5rem 0.75rem', fontSize: '0.85rem', outline: 'none', cursor: 'pointer' }

  return (
    <div>
      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '1.25rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <select value={filterType} onChange={e => setFilterType(e.target.value)} style={select}>
            <option value='all'>All Types</option>
            <option value='income'>Income</option>
            <option value='expense'>Expense</option>
          </select>
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={select}>
            <option value='all'>All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select value={filterMonth} onChange={e => setFilterMonth(e.target.value)} style={select}>
            <option value='all'>All Months</option>
            {months.map(m => <option key={m} value={m}>{new Date(m + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })}</option>)}
          </select>
          <button onClick={() => { setFilterType('all'); setFilterCategory('all'); setFilterMonth('all') }} style={{ background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '0.5rem 0.75rem', fontSize: '0.85rem', cursor: 'pointer', color: '#6b7280' }}>
            Clear
          </button>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <div style={{ background: '#d1fae5', borderRadius: '10px', padding: '0.5rem 1rem' }}>
            <p style={{ fontSize: '0.7rem', color: '#059669', fontWeight: '600' }}>INCOME</p>
            <p style={{ fontSize: '1rem', fontWeight: '800', color: '#059669' }}>{formatAmount(totalIncome)}</p>
          </div>
          <div style={{ background: '#fee2e2', borderRadius: '10px', padding: '0.5rem 1rem' }}>
            <p style={{ fontSize: '0.7rem', color: '#dc2626', fontWeight: '600' }}>EXPENSES</p>
            <p style={{ fontSize: '1rem', fontWeight: '800', color: '#dc2626' }}>{formatAmount(totalExpense)}</p>
          </div>
          <div style={{ background: '#f5f3ff', borderRadius: '10px', padding: '0.5rem 1rem' }}>
            <p style={{ fontSize: '0.7rem', color: '#6d28d9', fontWeight: '600' }}>TRANSACTIONS</p>
            <p style={{ fontSize: '1rem', fontWeight: '800', color: '#6d28d9' }}>{filtered.length}</p>
          </div>
        </div>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.25rem', color: '#7c3aed' }}>Transaction History</h2>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: '#9ca3af' }}>
            <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No transactions found</p>
            <p>Try changing your filters</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map((tx) => (
            <div key={tx._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '0.85rem 1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: tx.type === 'income' ? '#d1fae5' : '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: '800', color: tx.type === 'income' ? '#059669' : '#dc2626' }}>
                  {tx.type === 'income' ? '+' : '-'}
                </div>
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#0a0a0f' }}>{tx.description}</p>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{tx.category} · {new Date(tx.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <p style={{ fontWeight: '700', fontSize: '0.95rem', color: tx.type === 'income' ? '#059669' : '#dc2626' }}>
                  {tx.type === 'income' ? '+' : '-'}{formatAmount(tx.amount)}
                </p>
                <button onClick={() => onDelete(tx._id)} style={{ background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#9ca3af', cursor: 'pointer', padding: '4px 10px', fontSize: '0.8rem' }}>x</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TransactionList`;
fs.writeFileSync('src/components/TransactionList.jsx', code);
console.log('done');
