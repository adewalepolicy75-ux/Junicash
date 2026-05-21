const fs = require('fs');
let dash = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');
dash = dash.replace(
  `            </div>
            )}
            {activeTab === 'overview' && (`,
  `            </div>
            }
            {activeTab === 'overview' && (`
);
fs.writeFileSync('src/pages/Dashboard.jsx', dash);
console.log('done');
