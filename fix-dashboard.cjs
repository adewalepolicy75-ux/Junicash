const fs = require('fs');
let dash = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');
dash = dash.replace(
  `import { getTransactions, addTransaction, deleteTransaction, getCurrentUser, logout } from '../services/api'`,
  `import { getTransactions, addTransaction, deleteTransaction, getCurrentUser, logout, refreshUser } from '../services/api'`
);
dash = dash.replace(
  `    const currentUser = getCurrentUser()
    if (!currentUser) { navigate('/login'); return }
    setUser(currentUser)
    fetchTransactions()`,
  `    const currentUser = getCurrentUser()
    if (!currentUser) { navigate('/login'); return }
    setUser(currentUser)
    fetchTransactions()
    refreshUser().then(u => { if (u) setUser(u) })`
);
fs.writeFileSync('src/pages/Dashboard.jsx', dash);
console.log('done');
