const mongoose = require('mongoose');
const User = require('./models/User');
mongoose.connect('mongodb://localhost:27017/finance-db').then(async () => {
  const users = await User.find();
  for (const u of users) {
    if (!u.accountNumber) {
      u.accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      await u.save();
      console.log('Added account number to', u.name, ':', u.accountNumber);
    } else {
      console.log(u.name, 'already has:', u.accountNumber);
    }
  }
  mongoose.disconnect();
  console.log('done');
});
