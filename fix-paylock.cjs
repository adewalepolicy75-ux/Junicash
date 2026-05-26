const fs = require('fs');
let pay = fs.readFileSync('src/pages/PayPage.jsx', 'utf8');
pay = pay.replace(
  `import { FiSmartphone, FiWifi, FiTv, FiZap, FiCreditCard, FiHash, FiMonitor, FiServer, FiSun } from 'react-icons/fi'`,
  `import { FiSmartphone, FiWifi, FiTv, FiZap, FiCreditCard, FiHash, FiMonitor, FiServer, FiSun, FiLock } from 'react-icons/fi'`
);
pay = pay.replace(
  `            <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid #e5e7eb', cursor: 'pointer', background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: item.color }}>{item.icon}</span>
                <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#6d28d9' }}>{item.label}</span>
              </div>
              <span style={{ color: '#d1d5db' }}>›</span>
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
              <span style={{ color: '#d1d5db' }}>›</span>
            </div>
          ))}`,
  `            <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid #f3f4f6', cursor: 'not-allowed', background: '#fafafa', opacity: 0.7 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: item.color }}>{item.icon}</span>
                <div>
                  <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#6b7280' }}>{item.label}</span>
                  <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '0.1rem' }}>Coming soon</p>
                </div>
              </div>
              <FiLock size={16} color='#9ca3af' />
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0a0a0f', marginBottom: '1rem' }}>Cardless Payments</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {filtered(cardless).map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid #f3f4f6', cursor: 'not-allowed', background: '#fafafa', opacity: 0.7 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: item.color }}>{item.icon}</span>
                <div>
                  <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#6b7280' }}>{item.label}</span>
                  <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '0.1rem' }}>Coming soon</p>
                </div>
              </div>
              <FiLock size={16} color='#9ca3af' />
            </div>
          ))}`
);
fs.writeFileSync('src/pages/PayPage.jsx', pay);
console.log('done');
