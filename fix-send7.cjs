const fs = require('fs');
let send = fs.readFileSync('src/pages/SendPage.jsx', 'utf8');
send = send.replace(
  `  const [showPin, setShowPin] = useState(false)`,
  `  const [showPin, setShowPin] = useState(false)
  const [hasPin, setHasPin] = useState(true)

  useEffect(() => {
    const checkPin = async () => {
      if (!user) return
      const res = await fetch('http://localhost:5000/api/user/' + user.id)
      const data = await res.json()
      setHasPin(!!data.pin)
    }
    checkPin()
  }, [user])`
);
send = send.replace(
  `import { FiArrowRight, FiCheck } from 'react-icons/fi'`,
  `import { FiArrowRight, FiCheck, FiLock } from 'react-icons/fi'
import { useEffect } from 'react'`
);
send = send.replace(
  `        {error && <div style={{ background: '#fee2e2'`,
  `        {!hasPin && (
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiLock size={18} color='#f59e0b' />
              <p style={{ fontSize: '0.88rem', color: '#92400e', fontWeight: '600' }}>You need to set a PIN before sending money</p>
            </div>
            <button onClick={() => window.dispatchEvent(new CustomEvent('go-to-account'))} style={{ background: '#f59e0b', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Set PIN
            </button>
          </div>
        )}
        {error && <div style={{ background: '#fee2e2'`
);
send = send.replace(
  `disabled={loading || !receiver || !form.amount || !form.category}`,
  `disabled={loading || !receiver || !form.amount || !form.category || !hasPin}`
);
send = send.replace(
  `opacity: (!receiver || !form.amount || !form.category) ? 0.6 : 1`,
  `opacity: (!receiver || !form.amount || !form.category || !hasPin) ? 0.6 : 1`
);
fs.writeFileSync('src/pages/SendPage.jsx', send);
console.log('done');
