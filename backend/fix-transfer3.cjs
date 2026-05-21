const fs = require('fs');
let server = fs.readFileSync('server.js', 'utf8');
server = server.replace(
  `const { senderAccountNumber, receiverAccountNumber, amount, description } = req.body;`,
  `const { senderAccountNumber, receiverAccountNumber, amount, description, category } = req.body;`
);
server = server.replace(
  `const senderTx = new Transaction({ userId: sender._id, description: description || 'Transfer to ' + receiver.name, amount, type: 'expense', category: 'Transfer', date: new Date() });
    const receiverTx = new Transaction({ userId: receiver._id, description: description || 'Transfer from ' + sender.name, amount, type: 'income', category: 'Transfer', date: new Date() });`,
  `const senderTx = new Transaction({ userId: sender._id, description: description || 'Transfer to ' + receiver.name, amount, type: 'expense', category: category || 'Transfer', date: new Date() });
    const receiverTx = new Transaction({ userId: receiver._id, description: description || 'Transfer from ' + sender.name, amount, type: 'income', category: category || 'Transfer', date: new Date() });`
);
fs.writeFileSync('server.js', server);
console.log('done');
