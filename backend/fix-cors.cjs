const fs = require('fs');
let server = fs.readFileSync('server.js', 'utf8');
server = server.replace(
  `app.use(cors());`,
  `app.use(cors({
  origin: ['https://junicash.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));`
);
fs.writeFileSync('server.js', server);
console.log('done');
