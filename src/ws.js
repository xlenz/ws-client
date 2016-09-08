var WebSocket = require('ws');
var Jetty = require('jetty');
var jetty = new Jetty(process.stdout);
var tab = 4;
var verticalShift = 9;
var uri = `ws://${CONFIG.host}:${CONFIG.port}/serena_ra/webSocket`;

module.exports = (cookies, shift) => {
  return new Promise((resolve, reject) => {
    let ws = new WebSocket(uri, [], { 'headers': { 'Cookie': cookies } });

    ws.on('open', () => { if (shift === 1) console.log('Web Socket connection establised!'); });
    ws.on('error', (error) => console.log('Connection Error: ', error));
    ws.on('close', (message) => { console.log('Connection Closed', message); resolve(); });
    ws.on('message', (message) => {
      if (message === 'X') return; // kind of keep alive recieved
      try {
        let jsonMessage = JSON.parse(message);
        if (jsonMessage.messageContent) {
          let y = Math.floor(shift * tab / (CONFIG.consoleWidth - tab));
          let x = shift - Math.floor(y * (CONFIG.consoleWidth - tab) / tab);
          let text = '';
          if (jsonMessage.messageContent.runningProcessesCount < 1000) text = ' ' + text;
          if (jsonMessage.messageContent.runningProcessesCount < 100) text = ' ' + text;
          if (jsonMessage.messageContent.runningProcessesCount < 10) text = ' ' + text;
          text += jsonMessage.messageContent.runningProcessesCount.toString();
          return jetty.rgb(44, false)
            .moveTo([verticalShift + y, x * tab])
            .text(text);
        }
      } catch (e) { }
      console.log('Received unknown message: ', message);
    });
  });
};