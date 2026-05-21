const fs = require('fs');
let acc = fs.readFileSync('src/pages/AccountPage.jsx', 'utf8');
acc = acc.replace(
  `import { FiUser, FiShield, FiFileText, FiCreditCard, FiHelpCircle, FiLink, FiSliders, FiEyeOff, FiMoon } from 'react-icons/fi'`,
  `import { FiUser, FiShield, FiFileText, FiCreditCard, FiHelpCircle, FiLink, FiSliders, FiEyeOff, FiMoon } from 'react-icons/fi'
import PinModal from '../components/PinModal'`
);
acc = acc.replace(
  `  const [hideBalance, setHideBalance] = useState(false)`,
  `  const [hideBalance, setHideBalance] = useState(false)
  const [showSetPin, setShowSetPin] = useState(false)
  const [pinSuccess, setPinSuccess] = useState(false)`
);
acc = acc.replace(
  `      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>`,
  `      {showSetPin && (
        <PinModal
          title='Set Transaction PIN'
          userId={user?.id}
          mode='set'
          onConfirm={() => { setShowSetPin(false); setPinSuccess(true) }}
          onCancel={() => setShowSetPin(false)}
        />
      )}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>`
);
acc = acc.replace(
  `        <button onClick={() => setShowTopUp(true)} style={{ background: '#6d28d9', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '0.6rem 1.5rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', marginBottom: '1rem' }}>
          + Add Money
        </button>`,
  `        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1rem' }}>
          <button onClick={() => setShowTopUp(true)} style={{ background: '#6d28d9', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '0.6rem 1.5rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer' }}>
            + Add Money
          </button>
          <button onClick={() => setShowSetPin(true)} style={{ background: '#0a0a0f', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '0.6rem 1.5rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer' }}>
            Set PIN
          </button>
        </div>
        {pinSuccess && <p style={{ color: '#059669', fontSize: '0.85rem', marginBottom: '0.75rem', fontWeight: '600' }}>PIN set successfully!</p>}`
);
fs.writeFileSync('src/pages/AccountPage.jsx', acc);
console.log('done');
