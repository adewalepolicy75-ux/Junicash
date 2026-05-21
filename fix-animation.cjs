const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(
  `@keyframes fadeInRight {
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
}`,
  `@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(60px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes float {
  0%   { transform: translateY(0px); }
  10%  { transform: translateY(-20px); }
  20%  { transform: translateY(0px); }
  30%  { transform: translateY(-18px); }
  40%  { transform: translateY(0px); }
  60%  { transform: translateY(-8px); }
  80%  { transform: translateY(-4px); }
  100% { transform: translateY(0px); }
}
.hero-img {
  animation: fadeInRight 0.6s ease forwards, float 5s ease-in-out 0.6s infinite;
}`
);
fs.writeFileSync('index.html', html);
console.log('done');
