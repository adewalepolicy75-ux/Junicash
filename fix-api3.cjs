const fs = require('fs');
let api = fs.readFileSync('src/services/api.js', 'utf8');
api = api.replace(
  `export const getCurrentUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}`,
  `export const getCurrentUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const refreshUser = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) return null
    const res = await fetch('http://localhost:5000/api/user/' + user.id)
    if (!res.ok) return user
    const fresh = await res.json()
    const updated = { ...user, accountNumber: fresh.accountNumber, balance: fresh.balance }
    localStorage.setItem('user', JSON.stringify(updated))
    return updated
  } catch {
    return JSON.parse(localStorage.getItem('user'))
  }
}`
);
fs.writeFileSync('src/services/api.js', api);
console.log('done');
