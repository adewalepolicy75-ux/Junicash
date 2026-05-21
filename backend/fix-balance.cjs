const fs = require('fs');
const mongoose = require('mongoose');
const User = require('./models/User');
const Transaction = require('./models/Transaction');

mongoose.connect('mongodb://localhost:27017/finance-db').then(async () => {
  const users = await User.find();
  for (const user of users) {
    const transactions = await Transaction.find({ userId: user._id });
    const balance = transactions.reduce((sum, tx) => {
      return tx.type === 'income' ? sum + tx.amount : sum - tx.amount;
    }, 0);
    await User.findByIdAndUpdate(user._id, { balance });
    console.log('Updated', user.name, 'balance to', balance);
  }
  mongoose.disconnect();
  console.log('done');
});
