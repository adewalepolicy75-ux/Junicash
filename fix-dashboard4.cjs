const fs = require('fs');
let dash = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');

dash = dash.replace(
  `  const [activeTab, setActiveTab] = useState('overview')
  const [user, setUser] = useState(null)`,
  `  const [activeTab, setActiveTab] = useState('overview')
  const [user, setUser] = useState(null)
  const [hideBalance, setHideBalance] = useState(false)
  const [darkMode, setDarkMode] = useState(false)`
);

dash = dash.replace(
  `        {activeTab === 'account' && <AccountPage user={user} onLogout={handleLogout} />}`,
  `        {activeTab === 'account' && <AccountPage user={user} onLogout={handleLogout} hideBalance={hideBalance} setHideBalance={setHideBalance} darkMode={darkMode} setDarkMode={setDarkMode} />}`
);

dash = dash.replace(
  `    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>`,
  `    <div style={{ minHeight: '100vh', background: darkMode ? '#0a0a0f' : '#f9fafb', color: darkMode ? '#ffffff' : '#0a0a0f' }}>`
);

dash = dash.replace(
  `<h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0a0a0f', margin: '0.5rem 0 0.25rem' }}>
              {formatAmount(totalBalance)}`,
  `<h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0a0a0f', margin: '0.5rem 0 0.25rem' }}>
              {hideBalance ? '₦ ****' : formatAmount(totalBalance)}`
);

fs.writeFileSync('src/pages/Dashboard.jsx', dash);
console.log('done');
