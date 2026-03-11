const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
let clients = [];

wss.on('connection', ws => {
    clients.push(ws);
    console.log('Nuovo client connesso');

    ws.on('message', message => {
        console.log('Messaggio ricevuto: ' + message);
        // Invia a tutti i client tranne chi ha inviato
        clients.forEach(client => {
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        clients = clients.filter(c => c !== ws);
        console.log('Client disconnesso');
    });
});

console.log('Server WebSocket attivo sulla porta 8080');