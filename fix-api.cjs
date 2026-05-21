const fs = require('fs');
let api = fs.readFileSync('src/services/api.js', 'utf8');
api += `
export const lookupAccount = async (accountNumber) => {
  try {
    const res = await fetch('http://localhost:5000/api/user/account/' + accountNumber)
    return await res.json()
  } catch {
    return { message: 'Network error' }
  }
}

export const transferMoney = async (data) => {
  try {
    const res = await fetch('http://localhost:5000/api/transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return await res.json()
  } catch {
    return { message: 'Network error' }
  }
}`;
fs.writeFileSync('src/services/api.js', api);
console.log('done');
