global.CONFIG = require('./config/config');
console.log(CONFIG)

var auth = require('./src/auth');
var ws = require('./src/ws');

for (let i = 0; i < CONFIG.connections; i++) {
  (async () => {
    let authResponse = await auth();
    if (authResponse.success) {
      if (i === 1) console.log('Logged in to SDA!');
      await ws(authResponse.cookies, i);
    } else if (i === 1) {
      console.error('Unable to login to SDA.');
      if (authResponse.error) console.error(authResponse.error);
      else console.log('Failed to authorize.');
    }
  })();
}