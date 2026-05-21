import { useState } from 'react'
import { FiUser, FiShield, FiFileText, FiCreditCard, FiHelpCircle, FiLink, FiSliders, FiEyeOff, FiMoon } from 'react-icons/fi'
import PinModal from '../components/PinModal'

function AccountPage({ user, onLogout }) {
  const [hideBalance, setHideBalance] = useState(false)
  const [showSetPin, setShowSetPin] = useState(false)
  const [pinSuccess, setPinSuccess] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showTopUp, setShowTopUp] = useState(false)
  const [topUpAmount, setTopUpAmount] = useState('')
  const [topUpLoading, setTopUpLoading] = useState(false)
  const [topUpSuccess, setTopUpSuccess] = useState('')
  const [topUpError, setTopUpError] = useState('')

  const handleTopUp = async () => {
    if (!topUpAmount || Number(topUpAmount) <= 0) return
    setTopUpLoading(true)
    setTopUpError('')
    setTopUpSuccess('')
    try {
      const res = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: 'Top Up', amount: Number(topUpAmount), type: 'income', category: 'Other Income', date: new Date(), userId: user.id })
      })
      if (res.ok) {
        setTopUpSuccess('Balance topped up successfully!')
        setTopUpAmount('')
        setTimeout(() => { setShowTopUp(false); setTopUpSuccess('') }, 2000)
      } else {
        setTopUpError('Top up failed. Try again.')
      }
    } catch {
      setTopUpError('Network error.')
    }
    setTopUpLoading(false)
  }

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
      {showTopUp && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '380px', margin: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '1.25rem' }}>Top Up Balance</h3>
            {topUpSuccess && <div style={{ background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: '10px', padding: '0.75rem', marginBottom: '1rem', color: '#059669', fontSize: '0.85rem' }}>{topUpSuccess}</div>}
            {topUpError && <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.75rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.85rem' }}>{topUpError}</div>}
            <input
              type='number'
              placeholder='Enter amount (NGN)'
              value={topUpAmount}
              onChange={e => setTopUpAmount(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', marginBottom: '1rem', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setShowTopUp(false)} style={{ flex: 1, padding: '0.75rem', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#ffffff', color: '#6b7280', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}>Cancel</button>
              <button onClick={handleTopUp} disabled={topUpLoading} style={{ flex: 1, padding: '0.75rem', borderRadius: '10px', border: 'none', background: '#6d28d9', color: '#ffffff', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', opacity: topUpLoading ? 0.7 : 1 }}>
                {topUpLoading ? 'Processing...' : 'Top Up'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSetPin && (
        <PinModal
          title='Set Transaction PIN'
          userId={user?.id}
          mode='set'
          onConfirm={() => { setShowSetPin(false); setPinSuccess(true) }}
          onCancel={() => setShowSetPin(false)}
        />
      )}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#6d28d9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '2rem', margin: '0 auto 1rem', border: '3px solid #ddd6fe' }}>
          {user ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '0.4rem' }}>{user ? user.name : 'User'}</h2>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1rem' }}>
          <button onClick={() => setShowTopUp(true)} style={{ background: '#6d28d9', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '0.6rem 1.5rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer' }}>
            + Add Money
          </button>
          <button onClick={() => setShowSetPin(true)} style={{ background: '#0a0a0f', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '0.6rem 1.5rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer' }}>
            Set PIN
          </button>
        </div>
        {pinSuccess && <p style={{ color: '#059669', fontSize: '0.85rem', marginBottom: '0.75rem', fontWeight: '600' }}>PIN set successfully!</p>}
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

export default AccountPage