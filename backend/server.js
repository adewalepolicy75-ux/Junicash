const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

const otpStore = {};

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: '"JuniCash" <' + process.env.EMAIL_USER + '>',
    to: email,
    subject: 'JuniCash Email Verification',
    html: '<div style="font-family:sans-serif;max-width:400px;margin:0 auto;padding:2rem;background:#f5f3ff;border-radius:16px"><h2 style="color:#6d28d9">JuniCash</h2><p>Your verification code is:</p><h1 style="font-size:2.5rem;letter-spacing:0.2em;color:#0a0a0f;background:#ffffff;padding:1rem;border-radius:12px;text-align:center">' + otp + '</h1><p style="color:#9ca3af;font-size:0.85rem">This code expires in 10 minutes.</p></div>'
  });
};
const User = require('./models/User');
const Transaction = require('./models/Transaction');

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

app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, expires: Date.now() + 10 * 60 * 1000 };
    await sendOTP(email, otp);
    res.json({ message: 'OTP sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const stored = otpStore[email];
    if (!stored) return res.status(400).json({ message: 'No OTP found. Please request again.' });
    if (Date.now() > stored.expires) return res.status(400).json({ message: 'OTP expired. Please request again.' });
    if (stored.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    delete otpStore[email];
    res.json({ message: 'OTP verified' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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
    const { senderAccountNumber, receiverAccountNumber, amount, description, category } = req.body;
    if (senderAccountNumber === receiverAccountNumber) return res.status(400).json({ message: 'Cannot transfer to yourself' });
    const sender = await User.findOne({ accountNumber: senderAccountNumber });
    const receiver = await User.findOne({ accountNumber: receiverAccountNumber });
    if (!sender) return res.status(404).json({ message: 'Sender not found' });
    if (!receiver) return res.status(404).json({ message: 'Receiver not found' });
    const senderTxs = await Transaction.find({ userId: sender._id });
    const calculatedBalance = senderTxs.reduce((sum, tx) => tx.type === 'income' ? sum + tx.amount : sum - tx.amount, 0);
    if (calculatedBalance < amount) return res.status(400).json({ message: 'Insufficient balance' });
    sender.balance -= Number(amount);
    receiver.balance += Number(amount);
    await sender.save();
    await receiver.save();
    const senderTx = new Transaction({ userId: sender._id, description: description || 'Transfer to ' + receiver.name, amount, type: 'expense', category: category || 'Transfer', date: new Date() });
    const receiverTx = new Transaction({ userId: receiver._id, description: description || 'Transfer from ' + sender.name, amount, type: 'income', category: category || 'Transfer', date: new Date() });
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
    if (type === 'income') {
      await User.findByIdAndUpdate(txUserId, { $inc: { balance: Number(amount) } });
    } else {
      await User.findByIdAndUpdate(txUserId, { $inc: { balance: -Number(amount) } });
    }
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

app.post('/api/user/set-pin', async (req, res) => {
  try {
    const { userId, pin } = req.body;
    const hashedPin = await bcrypt.hash(pin, 10);
    await User.findByIdAndUpdate(userId, { pin: hashedPin });
    res.json({ message: 'PIN set successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/user/verify-pin', async (req, res) => {
  try {
    const { userId, pin } = req.body;
    const user = await User.findById(userId);
    if (!user.pin) return res.status(400).json({ message: 'PIN not set' });
    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect PIN' });
    res.json({ message: 'PIN verified' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "No account found with that email" });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, expires: Date.now() + 10 * 60 * 1000 };
    await sendOTP(email, otp);
    res.json({ message: 'OTP sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const stored = otpStore[email];
    if (Date.now() > stored.expires) return res.status(400).json({ message: 'OTP expired. Please request again.' });
    if (stored.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    delete otpStore[email];
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/user/forgot-pin', async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[user.email] = { otp, expires: Date.now() + 10 * 60 * 1000 };
    await sendOTP(user.email, otp);
    res.json({ message: 'OTP sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/user/reset-pin', async (req, res) => {
  try {
    const { userId, otp, newPin } = req.body;
    const user = await User.findById(userId);
    const stored = otpStore[user.email];
    if (Date.now() > stored.expires) return res.status(400).json({ message: 'OTP expired. Please request again.' });
    if (stored.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    delete otpStore[user.email];
    const hashedPin = await bcrypt.hash(newPin, 10);
    await User.findByIdAndUpdate(userId, { pin: hashedPin });
    res.json({ message: 'PIN reset successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log('Server running on port ' + PORT));