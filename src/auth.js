var cookie = require('cookie');
var request = require('request')
var querystring = require('querystring');

var uri = `http://${CONFIG.host}:${CONFIG.port}/serena_ra/tasks/LoginTasks/login`;

var form = {
  username: CONFIG.username,
  password: CONFIG.password,
  rememberMe: true
};

var formData = querystring.stringify(form);
var contentLength = formData.length;

module.exports = () => {
  return new Promise((resolve, reject) => {
    request({
      headers: {
        'Content-Length': contentLength,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      uri: uri,
      body: formData,
      method: 'POST'
    }, (err, res, body) => {
      if (err) return resolve({ success: false, error: err }); // unable to connect at all

      let cookies = cookie.serialize(res.headers['set-cookie']);
      if (!cookies.includes('login-cookie')) return resolve({ success: false, error: err }); // some issue with auth

      return resolve({ success: true, cookies: cookies }); // success!
    });
  });
};