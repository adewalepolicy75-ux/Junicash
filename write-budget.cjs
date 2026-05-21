const fs = require('fs');
const code = `import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#f97316', '#0891b2', '#6d28d9', '#ec4899', '#059669', '#f59e0b', '#14b8a6', '#8b5cf6']

const DEFAULT_LIMITS = {
  Food: { limit: 50000, color: '#f97316' },
  Transport: { limit: 30000, color: '#0891b2' },
  Housing: { limit: 150000, color: '#6d28d9' },
  Entertainment: { limit: 20000, color: '#ec4899' },
  Health: { limit: 40000, color: '#059669' },
  Shopping: { limit: 60000, color: '#f59e0b' },
  Utilities: { limit: 25000, color: '#14b8a6' },
  Other: { limit: 20000, color: '#8b5cf6' },
}

function BudgetPage({ transactions }) {
  const [limits, setLimits] = useState(() => {
    const saved = localStorage.getItem('budgetLimits')
    return saved ? JSON.parse(saved) : DEFAULT_LIMITS
  })
  const [editing, setEditing] = useState(null)
  const [editValue, setEditValue] = useState('')

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const monthlyExpenses = transactions.filter(tx => {
    const d = new Date(tx.date)
    return tx.type === 'expense' && d.getMonth() === currentMonth && d.getFullYear() === currentYear
  })

  const byCategory = {}
  monthlyExpenses.forEach(tx => {
    byCategory[tx.category] = (byCategory[tx.category] || 0) + Number(tx.amount)
  })

  const chartData = Object.entries(byCategory).map(([name, value]) => ({ name, value }))

  const formatAmount = (amount) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount)

  const totalSpent = monthlyExpenses.reduce((sum, tx) => sum + Number(tx.amount), 0)

  const handleEditSave = (category) => {
    const newLimit = Number(editValue)
    if (!newLimit || newLimit <= 0) return
    const updated = { ...limits, [category]: { ...limits[category], limit: newLimit } }
    setLimits(updated)
    localStorage.setItem('budgetLimits', JSON.stringify(updated))
    setEditing(null)
    setEditValue('')
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '0.5rem' }}>Monthly Summary</h2>
      <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '2rem' }}>Track your spending this month</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>

        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0a0a0f', marginBottom: '0.25rem' }}>Spending Breakdown</h3>
          <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '1.5rem' }}>Total: {formatAmount(totalSpent)}</p>

          {chartData.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: '#9ca3af' }}>
              <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>( - )</p>
              <p>No expenses this month yet</p>
            </div>
          ) : (
            <ResponsiveContainer width='100%' height={280}>
              <PieChart>
                <Pie data={chartData} cx='50%' cy='50%' innerRadius={70} outerRadius={110} paddingAngle={3} dataKey='value'>
                  {chartData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatAmount(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0a0a0f' }}>Budget Limits</h3>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Click amount to edit</p>
          </div>

          {Object.entries(limits).map(([category, { limit, color: catColor }]) => {
            const spent = byCategory[category] || 0
            const percent = Math.min((spent / limit) * 100, 100)
            const over = spent > limit
            const barColor = over ? '#dc2626' : percent > 75 ? '#f59e0b' : catColor

            return (
              <div key={category} style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: '600', color: '#0a0a0f', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: catColor, display: 'inline-block' }}></span>
                    {category}
                  </p>
                  {editing === category ? (
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <input
                        type='number'
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        style={{ width: '90px', padding: '2px 6px', borderRadius: '6px', border: '1px solid #c4b5fd', fontSize: '0.78rem', outline: 'none' }}
                        autoFocus
                      />
                      <button onClick={() => handleEditSave(category)} style={{ background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '6px', padding: '2px 8px', cursor: 'pointer', fontSize: '0.75rem' }}>Save</button>
                      <button onClick={() => setEditing(null)} style={{ background: '#f3f4f6', color: '#6b7280', border: 'none', borderRadius: '6px', padding: '2px 8px', cursor: 'pointer', fontSize: '0.75rem' }}>X</button>
                    </div>
                  ) : (
                    <p onClick={() => { setEditing(category); setEditValue(limit) }} style={{ fontSize: '0.78rem', color: over ? '#dc2626' : '#9ca3af', cursor: 'pointer', textDecoration: 'underline dotted' }}>
                      {formatAmount(spent)} / {formatAmount(limit)}
                      {over && <span style={{ marginLeft: '0.4rem', color: '#dc2626', fontWeight: '700' }}>Over!</span>}
                    </p>
                  )}
                </div>
                <div style={{ background: '#f3f4f6', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                  <div style={{ width: percent + '%', height: '100%', background: barColor, borderRadius: '999px', transition: 'width 0.5s ease' }} />
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default BudgetPage`;
fs.writeFileSync('src/pages/BudgetPage.jsx', code);
console.log('done');
