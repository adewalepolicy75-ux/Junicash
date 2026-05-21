const fs = require('fs');
const code = `import { useState } from 'react'
import { FiSmartphone, FiWifi, FiTv, FiZap, FiSun, FiCreditCard, FiHash, FiMonitor, FiServer } from 'react-icons/fi'

function PayPage() {
  const [search, setSearch] = useState('')

  const essentials = [
    { icon: <FiSmartphone size={20} />, label: 'Airtime', color: '#f59e0b' },
    { icon: <FiWifi size={20} />, label: 'Internet', color: '#6d28d9' },
    { icon: <FiTv size={20} />, label: 'TV', color: '#0891b2' },
    { icon: <FiZap size={20} />, label: 'Electricity', color: '#dc2626' },
    { icon: <FiSun size={20} />, label: 'Solar', color: '#f59e0b' },
    { icon: <FiServer size={20} />, label: 'eSIM', color: '#16a34a' },
  ]

  const cardless = [
    { icon: <FiCreditCard size={20} />, label: 'Pay with Bank', color: '#6d28d9' },
    { icon: <FiHash size={20} />, label: 'Pay with USSD', color: '#f59e0b' },
    { icon: <FiMonitor size={20} />, label: 'POS Terminal', color: '#dc2626' },
  ]

  const filtered = (items) => items.filter(i => i.label.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#6d28d9', marginBottom: '1.5rem', textAlign: 'center' }}>Pay</h2>

      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1.5rem' }}>
          <span style={{ color: '#9ca3af' }}>Ì¥ç</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder='Search for bill' style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.95rem', color: '#0a0a0f', width: '100%' }} />
          {search && <span onClick={() => setSearch('')} style={{ color: '#9ca3af', cursor: 'pointer', fontSize: '1rem' }}>x</span>}
        </div>

        <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0a0a0f', marginBottom: '1rem' }}>Essentials</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {filtered(essentials).map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid #e5e7eb', cursor: 'pointer', background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: item.color }}>{item.icon}</span>
                <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#6d28d9' }}>{item.label}</span>
              </div>
              <span style={{ color: '#d1d5db' }}>‚Ä∫</span>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0a0a0f', marginBottom: '1rem' }}>Cardless Payments</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {filtered(cardless).map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid #e5e7eb', cursor: 'pointer', background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: item.color }}>{item.icon}</span>
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
