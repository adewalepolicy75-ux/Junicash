const fs = require('fs');
let send = fs.readFileSync('src/pages/SendPage.jsx', 'utf8');
send = send.replace(
  `      senderAccountNumber: user.accountNumber,
      receiverAccountNumber: form.accountNumber,
      amount: Number(form.amount),
      description: form.category + (form.description ? ' - ' + form.description : '') + ' (Transfer to ' + form.accountNumber + ')'`,
  `      senderAccountNumber: user.accountNumber,
      receiverAccountNumber: form.accountNumber,
      amount: Number(form.amount),
      category: form.category,
      description: form.description || 'Transfer to ' + form.accountNumber`
);
fs.writeFileSync('src/pages/SendPage.jsx', send);
console.log('done');
