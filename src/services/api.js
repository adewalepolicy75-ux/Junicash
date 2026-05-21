const API_BASE = 'http://localhost:5000/api'

export const registerUser = async (data) => {
  const res = await fetch(API_BASE + '/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return await res.json()
}

export const loginUser = async (data) => {
  const res = await fetch(API_BASE + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return await res.json()
}

export const getCurrentUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const logout = () => {
  localStorage.removeItem('user')
}

export const refreshUser = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) return null
    const res = await fetch(API_BASE + '/user/' + user.id)
    if (!res.ok) return user
    const fresh = await res.json()
    const updated = { ...user, accountNumber: fresh.accountNumber, balance: fresh.balance }
    localStorage.setItem('user', JSON.stringify(updated))
    return updated
  } catch {
    return JSON.parse(localStorage.getItem('user'))
  }
}

export const getTransactions = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    const url = user ? API_BASE + '/transactions?userId=' + user.id : API_BASE + '/transactions'
    const res = await fetch(url)
    if (!res.ok) throw new Error()
    return await res.json()
  } catch {
    return []
  }
}

export const addTransaction = async (data) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    const res = await fetch(API_BASE + '/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, userId: user?.id })
    })
    if (!res.ok) throw new Error()
    return await res.json()
  } catch {
    return { _id: Date.now().toString(), ...data }
  }
}

export const deleteTransaction = async (id) => {
  try {
    await fetch(API_BASE + '/transactions/' + id, { method: 'DELETE' })
  } catch {
    console.error('Delete failed')
  }
}

export const lookupAccount = async (accountNumber) => {
  try {
    const res = await fetch(API_BASE + '/user/account/' + accountNumber)
    return await res.json()
  } catch {
    return { message: 'Network error' }
  }
}

export const transferMoney = async (data) => {
  try {
    const res = await fetch(API_BASE + '/transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return await res.json()
  } catch {
    return { message: 'Network error' }
  }
}