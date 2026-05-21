const fs = require('fs');
let acc = fs.readFileSync('src/pages/AccountPage.jsx', 'utf8');
acc = acc.replace(
  `  const [hideBalance, setHideBalance] = useState(false)
  const [darkMode, setDarkMode] = useState(false)`,
  `  const [hideBalance, setHideBalance] = useState(false)
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
  }`
);

acc = acc.replace(
  `      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>`,
  `      {showTopUp && (
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

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>`
);

acc = acc.replace(
  `        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>`,
  `        <button onClick={() => setShowTopUp(true)} style={{ background: '#6d28d9', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '0.6rem 1.5rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', marginBottom: '1rem' }}>
          + Add Money
        </button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>`
);

fs.writeFileSync('src/pages/AccountPage.jsx', acc);
console.log('done');
