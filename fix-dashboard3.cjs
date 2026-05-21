const fs = require('fs');
let dash = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');
dash = dash.replace(
  `    refreshUser().then(u => { if (u) setUser(u) })`,
  `    refreshUser().then(u => { if (u) setUser(u) })
    const goToAccount = () => setActiveTab('account')
    window.addEventListener('go-to-account', goToAccount)
    return () => window.removeEventListener('go-to-account', goToAccount)`
);
fs.writeFileSync('src/pages/Dashboard.jsx', dash);
console.log('done');
