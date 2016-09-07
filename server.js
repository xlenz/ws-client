global.CONFIG = require('./config/config');
console.log(CONFIG)

var auth = require('./src/auth');
var ws = require('./src/ws');

(async () => {
    let authResponse = await auth();
    if (authResponse.success) {
        console.log('Logged in to SDA!');
        await ws(authResponse.cookies);
    } else {
        console.error('Unable to login to SDA.');
        if (authResponse.error) console.error(authResponse.error);
        else console.log('Failed to authorize.');
    }
})();
