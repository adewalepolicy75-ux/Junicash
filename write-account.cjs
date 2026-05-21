const fs = require('fs');
const code = `import { useState } from 'react'
import { FiUser, FiShield, FiFileText, FiCreditCard, FiHelpCircle, FiLink, FiSliders, FiEyeOff, FiMoon } from 'react-icons/fi'

function AccountPage({ user, onLogout }) {
  const [hideBalance, setHideBalance] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const menuItems = [
    [
      { icon: <FiUser size={18} />, label: 'View Profile', color: '#6d28d9' },
      { icon: <FiSliders size={18} />, label: 'Account Limits', color: '#059669' },
    ],
    [
      { icon: <FiFileText size={18} />, label: 'Statement & Reports', color: '#059669' },
      { icon: <FiFileText size={18} />, label: 'Legal', color: '#0891b2' },
    ],
    [
      { icon: <FiCreditCard size={18} />, label: 'Saved Cards', color: '#0891b2' },
      { icon: <FiShield size={18} />, label: 'Security', color: '#f59e0b' },
    ],
    [
      { icon: <FiHelpCircle size={18} />, label: 'Get Help', color: '#dc2626' },
      { icon: <FiEyeOff size={18} />, label: 'Hide Balance', color: '#6d28d9', toggle: true, value: hideBalance, onChange: () => setHideBalance(!hideBalance) },
    ],
    [
      { icon: <FiLink size={18} />, label: 'Linked Accounts', color: '#f59e0b' },
      { icon: <FiMoon size={18} />, label: 'Dark Mode', color: '#6d28d9', toggle: true, value: darkMode, onChange: () => setDarkMode(!darkMode) },
    ],
  ]

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#6d28d9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '2rem', margin: '0 auto 1rem', border: '3px solid #ddd6fe' }}>
          {user ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '0.4rem' }}>{user ? user.name : 'User'}</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ color: '#6d28d9' }}>◈</span>
            <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>@{user ? user.name.toLowerCase().replace(' ', '') : 'username'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ color: '#6d28d9' }}>◈</span>
            <span style={{ fontSize: '0.9rem', color: '#6b7280', letterSpacing: '0.05em' }}>{user ? user.accountNumber : '0000000000'}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {menuItems.map((row, rowIndex) =>
          row.map((item, colIndex) => (
            <div key={rowIndex + '-' + colIndex} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem 1.25rem', cursor: item.toggle ? 'default' : 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#0a0a0f' }}>{item.label}</span>
              </div>
              {item.toggle ? (
                <div onClick={item.onChange} style={{ width: '44px', height: '24px', borderRadius: '999px', background: item.value ? '#6d28d9' : '#e5e7eb', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#ffffff', position: 'absolute', top: '2px', left: item.value ? '22px' : '2px', transition: 'left 0.2s' }} />
                </div>
              ) : (
                <span style={{ color: '#d1d5db' }}>›</span>
              )}
            </div>
          ))
        )}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={onLogout} style={{ background: 'transparent', border: 'none', color: '#dc2626', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default AccountPage`;
fs.writeFileSync('src/pages/AccountPage.jsx', code);
console.log('done');
