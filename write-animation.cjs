const fs = require('fs');

let home = fs.readFileSync('src/pages/Home.jsx', 'utf8');

const animationStyle = `
<style>
@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}
.hero-img {
  animation: fadeInRight 0.8s ease forwards, float 4s ease-in-out 0.8s infinite;
}
</style>`;

home = home.replace(
  `import { Link } from 'react-router-dom'`,
  `import { Link } from 'react-router-dom'`
);

home = home.replace(
  `style={{ width: '100%', maxWidth: '480px', borderRadius: '20px', objectFit: 'cover' }}`,
  `className='hero-img' style={{ width: '100%', maxWidth: '480px', borderRadius: '20px', objectFit: 'cover' }}`
);

home = home.replace(
  `export default Home`,
  `export default Home`
);

fs.writeFileSync('src/pages/Home.jsx', home);

let indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('@keyframes float')) {
  indexHtml = indexHtml.replace('</head>', `<style>
@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}
.hero-img {
  animation: fadeInRight 0.8s ease forwards, float 4s ease-in-out 0.8s infinite;
}
</style></head>`);
  fs.writeFileSync('index.html', indexHtml);
}

console.log('done');
