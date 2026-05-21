const fs = require('fs');
let server = fs.readFileSync('server.js', 'utf8');
server = server.replace(
  `res.status(500).json({ message: err.message });
  }
});

app.post('/api/auth/login'`,
  `console.error('Signup error:', err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/auth/login'`
);
fs.writeFileSync('server.js', server);
console.log('done');
