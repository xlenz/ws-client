var WebSocket = require('ws');

module.exports = (cookies) => {
  return new Promise((resolve, reject) => {
    let ws = new WebSocket(
        `ws://${CONFIG.host}:${CONFIG.port}/serena_ra/webSocket`,
        [],
        {
            'headers': {
                'Cookie': cookies
            }
        }
    );

    ws.on( 'open',      () =>           console.log("Web Socket connection establised!") );
    ws.on( 'error',     (error) =>      console.log("Connection Error: ", error) );
    ws.on( 'close',     (message) =>    { console.log('Connection Closed', message); resolve(); });
    ws.on( 'message',   (message) => {
        if (message === 'X') return; // kind of keep alive recieved
         try {
            let jsonMessage = JSON.parse(message);
            if (jsonMessage.messageContent) return console.log(jsonMessage.messageContent.runningProcessesCount);
        } catch (e) { }
        console.log("Received unknown message: ", message);
    });
  });
}