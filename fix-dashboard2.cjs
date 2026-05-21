const fs = require('fs');
let dash = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');
dash = dash.replace(
  `  const handleAdd = async (form) => {
    const newTx = await addTransaction(form)
    setTransactions(prev => [newTx, ...prev])
    setActiveTab('overview')
  }`,
  `  const handleAdd = async (form) => {
    const newTx = await addTransaction(form)
    setTransactions(prev => [newTx, ...prev])
    setActiveTab('overview')
    fetchTransactions()
  }`
);
fs.writeFileSync('src/pages/Dashboard.jsx', dash);
console.log('done');
