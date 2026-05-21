const fs = require('fs');
const code = `const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Transaction = require('./models/Transaction');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/finance-db';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const generateAccountNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 12);
    let accountNumber = generateAccountNumber();
    while (await User.findOne({ accountNumber })) {
      accountNumber = generateAccountNumber();
    }
    const user = new User({ name, email, password: hashedPassword, accountNumber, balance: 0 });
    await user.save();
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, accountNumber: user.accountNumber, balance: user.balance } });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    res.json({ user: { id: user._id, name: user.name, email: user.email, accountNumber: user.accountNumber, balance: user.balance } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/user/account/:accountNumber', async (req, res) => {
  try {
    const user = await User.findOne({ accountNumber: req.params.accountNumber }).select('-password');
    if (!user) return res.status(404).json({ message: 'Account not found' });
    res.json({ name: user.name, accountNumber: user.accountNumber });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/transfer', async (req, res) => {
  try {
    const { senderAccountNumber, receiverAccountNumber, amount, description } = req.body;
    if (senderAccountNumber === receiverAccountNumber) return res.status(400).json({ message: 'Cannot transfer to yourself' });
    const sender = await User.findOne({ accountNumber: senderAccountNumber });
    const receiver = await User.findOne({ accountNumber: receiverAccountNumber });
    if (!sender) return res.status(404).json({ message: 'Sender not found' });
    if (!receiver) return res.status(404).json({ message: 'Receiver not found' });
    if (sender.balance < amount) return res.status(400).json({ message: 'Insufficient balance' });
    sender.balance -= Number(amount);
    receiver.balance += Number(amount);
    await sender.save();
    await receiver.save();
    const senderTx = new Transaction({ userId: sender._id, description: description || 'Transfer to ' + receiver.name, amount, type: 'expense', category: 'Transfer', date: new Date() });
    const receiverTx = new Transaction({ userId: receiver._id, description: description || 'Transfer from ' + sender.name, amount, type: 'income', category: 'Transfer', date: new Date() });
    await senderTx.save();
    await receiverTx.save();
    res.json({ message: 'Transfer successful', senderBalance: sender.balance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/transactions', async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/transactions', async (req, res) => {
  try {
    const { description, amount, type, category, date, userId } = req.body;
    const txUserId = userId || (await User.findOne())?._id;
    if (!txUserId) return res.status(400).json({ message: 'No user found' });
    const transaction = new Transaction({ description, amount, type, category, date, userId: txUserId });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/transactions/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log('Server running on port ' + PORT));`;
fs.writeFileSync('server.js', code);
console.log('done');
