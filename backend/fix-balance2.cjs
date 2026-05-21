const fs = require('fs');
let server = fs.readFileSync('server.js', 'utf8');
server = server.replace(
  `    const transaction = new Transaction({ description, amount, type, category, date, userId: txUserId });
    await transaction.save();
    res.status(201).json(transaction);`,
  `    const transaction = new Transaction({ description, amount, type, category, date, userId: txUserId });
    await transaction.save();
    if (type === 'income') {
      await User.findByIdAndUpdate(txUserId, { $inc: { balance: Number(amount) } });
    } else {
      await User.findByIdAndUpdate(txUserId, { $inc: { balance: -Number(amount) } });
    }
    res.status(201).json(transaction);`
);
fs.writeFileSync('server.js', server);
console.log('done');
