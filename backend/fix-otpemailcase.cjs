const fs = require('fs');
const path = 'server.js';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  `app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { email } = req.body;`,
  `app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();`
);

content = content.replace(
  `app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;`,
  `app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const { otp } = req.body;`
);

fs.writeFileSync(path, content);
console.log('Done: OTP routes now normalize email too');
