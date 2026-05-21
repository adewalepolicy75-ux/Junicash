const fs = require('fs');
const code = `import { useState } from 'react'
import { FiHome, FiSend, FiCreditCard, FiPieChart, FiLogOut, FiMenu, FiX } from 'react-icons/fi'

function Navbar({ user, onLogout, activeTab, setActiveTab }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { icon: <FiHome size={16} />, label: 'Home', tab: 'overview' },
    { icon: <FiSend size={16} />, label: 'Send', tab: 'send' },
    { icon: <FiCreditCard size={16} />, label: 'Pay', tab: 'add' },
    { icon: <FiPieChart size={16} />, label: 'Budget', tab: 'transactions' },
  ]

  const handleTab = (tab) => {
    setActiveTab && setActiveTab(tab)
    setMenuOpen(false)
  }

  return (
    <nav style={{ background: '#0a0a0f', borderBottom: '1px solid #1e1a2e', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', position: 'sticky', top: 0, zIndex: 100 }}>
      <h1 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', minWidth: '120px' }}>
        Juni<span style={{ color: '#8b5cf6' }}>Cash</span>
      </h1>

      <div className='nav-desktop' style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {navItems.map(item => (
          <button key={item.tab} onClick={() => handleTab(item.tab)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.88rem', fontWeight: '600', background: activeTab === item.tab ? '#1a1030' : 'transparent', color: activeTab === item.tab ? '#8b5cf6' : '#9ca3af' }}>
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      <div className='nav-desktop' style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '120px', justifyContent: 'flex-end' }}>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#6d28d9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '0.9rem' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{user.name}</span>
          </div>
        )}
        {onLogout && (
          <button onClick={onLogout} style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}>
            <FiLogOut size={16} /> Logout
          </button>
        )}
      </div>

      <button className='nav-mobile' onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'none' }}>
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {menuOpen && (
        <div style={{ position: 'absolute', top: '64px', left: 0, right: 0, background: '#0a0a0f', borderBottom: '1px solid #1e1a2e', padding: '1rem 2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 99 }}>
          {navItems.map(item => (
            <button key={item.tab} onClick={() => handleTab(item.tab)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '600', background: activeTab === item.tab ? '#1a1030' : 'transparent', color: activeTab === item.tab ? '#8b5cf6' : '#9ca3af', textAlign: 'left' }}>
              {item.icon} {item.label}
            </button>
          ))}
          <hr style={{ border: 'none', borderTop: '1px solid #1e1a2e', margin: '0.5rem 0' }} />
          {user && <p style={{ color: '#9ca3af', fontSize: '0.85rem', padding: '0 1rem' }}>{user.name}</p>}
          {onLogout && (
            <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '600', background: 'transparent', color: '#f87171', textAlign: 'left' }}>
              <FiLogOut size={16} /> Logout
            </button>
          )}
        </div>
      )}

      <style>{\`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: block !important; }
        }
      \`}</style>
    </nav>
  )
}

export default Navbar`;
fs.writeFileSync('src/components/Navbar.jsx', code);
console.log('done');
