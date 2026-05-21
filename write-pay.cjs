const fs = require('fs');
const code = `import { useState } from 'react'

function PayPage() {
  const [search, setSearch] = useState('')

  const essentials = [
    { icon: 'Ì≥±', label: 'Airtime', color: '#f59e0b' },
    { icon: 'Ì≥∂', label: 'Internet', color: '#6d28d9' },
    { icon: 'Ì≥∫', label: 'TV', color: '#0891b2' },
    { icon: 'Ì≤°', label: 'Electricity', color: '#dc2626' },
    { icon: '‚òÄÔ∏è', label: 'Solar', color: '#f59e0b' },
    { icon: 'Ì≥≤', label: 'eSIM', color: '#16a34a' },
  ]

  const cardless = [
    { icon: 'Ìø¶', label: 'Pay with Bank', color: '#6d28d9' },
    { icon: '#', label: 'Pay with USSD', color: '#f59e0b' },
    { icon: 'Ì∂•Ô∏è', label: 'POS Terminal', color: '#dc2626' },
  ]

  const filtered = (items) => items.filter(i => i.label.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#6d28d9', marginBottom: '1.5rem', textAlign: 'center' }}>Pay</h2>

      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1.5rem' }}>
          <span style={{ color: '#9ca3af' }}>Ì¥ç</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='Search for bill'
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.95rem', color: '#0a0a0f', width: '100%' }}
          />
          {search && <span onClick={() => setSearch('')} style={{ color: '#9ca3af', cursor: 'pointer', fontSize: '1rem' }}>‚úï</span>}
        </div>

        <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0a0a0f', marginBottom: '1rem' }}>Essentials</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {filtered(essentials).map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid #e5e7eb', cursor: 'pointer', background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#6d28d9' }}>{item.label}</span>
              </div>
              <span style={{ color: '#d1d5db' }}>‚Ä∫</span>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0a0a0f', marginBottom: '1rem' }}>Cardless Payments</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {filtered(cardless).map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid #e5e7eb', cursor: 'pointer', background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#6d28d9' }}>{item.label}</span>
              </div>
              <span style={{ color: '#d1d5db' }}>‚Ä∫</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default PayPage`;
fs.writeFileSync('src/pages/PayPage.jsx', code);
console.log('done');
