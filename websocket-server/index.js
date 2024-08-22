const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on('connection', (ws) => {
    clients.push(ws);
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log('Received:', message);

        // Notify the sender that their message was sent
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'status', message: 'Message sent' }));
        }

        // Broadcast the message to all other clients except the sender
        clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        clients = clients.filter(client => client !== ws);
        console.log('Client disconnected');
    });
});

// Listen on all network interfaces
server.listen(8080, '0.0.0.0', () => {
    console.log('WebSocket server is running on port 8080');
});
