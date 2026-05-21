const fs = require('fs');
let api = fs.readFileSync('src/services/api.js', 'utf8');
api = api.replace(
  `export const getTransactions = async () => {
  try {
    const res = await fetch(API_BASE + '/transactions')
    if (!res.ok) throw new Error()
    return await res.json()
  } catch {
    const stored = localStorage.getItem('transactions')
    return stored ? JSON.parse(stored) : []
  }
}`,
  `export const getTransactions = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    const url = user ? API_BASE + '/transactions?userId=' + user.id : API_BASE + '/transactions'
    const res = await fetch(url)
    if (!res.ok) throw new Error()
    return await res.json()
  } catch {
    const stored = localStorage.getItem('transactions')
    return stored ? JSON.parse(stored) : []
  }
}`
);
fs.writeFileSync('src/services/api.js', api);
console.log('done');
