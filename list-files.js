const fs = require('fs');
const p = 'C:\\Users\\admin\\weather-forecast';
function walk(d, indent) {
  try {
    const f = fs.readdirSync(d);
    f.forEach(x => {
      if (x === '.git') return;
      const fp = d + '\\' + x;
      const s = fs.statSync(fp);
      if (s.isDirectory()) {
        console.log(indent + x + '/');
        walk(fp, indent + '  ');
      } else {
        console.log(indent + x);
      }
    });
  } catch {}
}
walk(p, '');