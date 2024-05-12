const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT });

// Array to keep track of connected clients
const clients = [];

wss.on('connection', ws => {
  // Add new client to the list
  clients.push(ws);

  // Handle incoming messages from clients
  ws.on('message', message => {
    console.log(`Received message => ${message}`);
    
    // Example of broadcasting the received message to all clients
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message); // Send the message to other clients
      }
    });
  });

  // Send a greeting message to the newly connected client
  ws.send('Hello! Message From Server!!');

  // Handle errors
  ws.on('error', error => {
    console.error(`WebSocket encountered error: ${error.message}`);
  });

  // Handle client disconnection
  ws.on('close', () => {
    // Remove the client from the list of connected clients
    const index = clients.indexOf(ws);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

