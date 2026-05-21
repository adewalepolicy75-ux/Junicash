const fs = require('fs');
const code = `import { useState } from 'react'

const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other Income'],
  expense: ['Food', 'Transport', 'Housing', 'Entertainment', 'Health', 'Shopping', 'Utilities', 'Other'],
}

const CATEGORY_ICONS = {
  Salary: 'í²¼', Freelance: 'í¶¥ï¸', Investment: 'í³ˆ', Gift: 'ï¿½ï¿½', 'Other Income': 'í²°',
  Food: 'í½”', Transport: 'íº—', Housing: 'í¿ ', Entertainment: 'í¾®', Health: 'í¿¥',
  Shopping: 'í»ï¸', Utilities: 'âš¡', Other: 'í³¦',
}

function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({ type: 'expense', amount: '', category: '', description: '', date: new Date().toISOString().split('T')[0] })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'type') {
      setForm({ ...form, type: value, category: '' })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.amount || !form.description || !form.category) {
      setError('Please fill in all fields including category')
      return
    }
    setError('')
    onAdd(form)
    setForm({ type: form.type, amount: '', category: '', description: '', date: new Date().toISOString().split('T')[0] })
  }

  const input = { background: '#ffffff', border: '1px solid #c4b5fd', borderRadius: '10px', color: '#0a0a0f', padding: '0.75rem 1rem', fontSize: '0.9rem', width: '100%', outline: 'none', boxSizing: 'border-box' }

  return (
    <div style={{ background: '#ede9fe', border: '1px solid #c4b5fd', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.25rem', color: '#6d28d9' }}>+ Add Transaction</h2>

      {error && (
        <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.85rem' }}>{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Type</label>
            <select name='type' value={form.type} onChange={handleChange} style={input}>
              <option value='income'>Income</option>
              <option value='expense'>Expense</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Amount (NGN) *</label>
            <input type='number' name='amount' placeholder='0' value={form.amount} onChange={handleChange} style={input} min='0' />
          </div>
        </div>

        <div style={{ marginBottom: '0.75rem' }}>
          <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.5rem' }}>Category * <span style={{ color: '#dc2626' }}>(required)</span></label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.5rem' }}>
            {CATEGORIES[form.type].map(cat => (
              <button key={cat} type='button' onClick={() => setForm({ ...form, category: cat })} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.75rem', borderRadius: '10px', border: form.category === cat ? '2px solid #6d28d9' : '1px solid #ddd6fe', background: form.category === cat ? '#6d28d9' : '#ffffff', color: form.category === cat ? '#ffffff' : '#0a0a0f', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600' }}>
                {CATEGORY_ICONS[cat]} {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Description *</label>
            <input type='text' name='description' placeholder='What is this for?' value={form.description} onChange={handleChange} style={input} />
          </div>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Date</label>
            <input type='date' name='date' value={form.date} onChange={handleChange} style={input} />
          </div>
        </div>

        <button type='submit' style={{ background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.85rem', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', width: '100%', marginTop: '0.5rem' }}>
          Add Transaction
        </button>
      </form>
    </div>
  )
}

export default TransactionForm`;
fs.writeFileSync('src/components/TransactionForm.jsx', code);
console.log('done');
