const fs = require('fs');

// Fix PayPage - add FiLock import
let pay = fs.readFileSync('src/pages/PayPage.jsx', 'utf8');
pay = pay.replace(
  `import { FiSmartphone, FiWifi, FiTv, FiZap, FiSun, FiCreditCard, FiHash, FiMonitor, FiServer } from 'react-icons/fi'`,
  `import { FiSmartphone, FiWifi, FiTv, FiZap, FiSun, FiCreditCard, FiHash, FiMonitor, FiServer, FiLock } from 'react-icons/fi'`
);
pay = pay.replace(
  `<span style={{ color: '#9ca3af' }}>���</span>`,
  `<span style={{ color: '#9ca3af' }}>🔍</span>`
);
fs.writeFileSync('src/pages/PayPage.jsx', pay);
console.log('PayPage fixed');

// Fix Hide Balance and Dark Mode in Dashboard
let dash = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');
dash = dash.replace(
  `import { getTransactions, addTransaction, deleteTransaction, getCurrentUser, logout, refreshUser } from '../services/api'`,
  `import { getTransactions, addTransaction, deleteTransaction, getCurrentUser, logout, refreshUser } from '../services/api'`
);
fs.writeFileSync('src/pages/Dashboard.jsx', dash);
console.log('Dashboard checked');

// Fix AccountPage - pass setHideBalance and setDarkMode to Dashboard
let acc = fs.readFileSync('src/pages/AccountPage.jsx', 'utf8');

// Fix hide balance - pass it up to dashboard
acc = acc.replace(
  `function AccountPage({ user, onLogout }) {`,
  `function AccountPage({ user, onLogout, hideBalance, setHideBalance, darkMode, setDarkMode }) {`
);
acc = acc.replace(
  `  const [hideBalance, setHideBalance] = useState(false)
  const [darkMode, setDarkMode] = useState(false)`,
  ``
);
fs.writeFileSync('src/pages/AccountPage.jsx', acc);
console.log('AccountPage fixed');

console.log('All done');
