const fs = require('fs');
let api = fs.readFileSync('src/services/api.js', 'utf8');
api = api.replace(
  `export const addTransaction = async (data) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    const res = await fetch(API_BASE + '/transactions', {`,
  `export const addTransaction = async (data) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log('USER FROM STORAGE:', user)
    console.log('SENDING TRANSACTION:', { ...data, userId: user?.id })
    const res = await fetch(API_BASE + '/transactions', {`
);
fs.writeFileSync('src/services/api.js', api);
console.log('done');
