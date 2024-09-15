// Import the dgram module
import dgram from 'dgram';
import { mqttPublish } from './mqtt.js';

// Create a UDP server
const server = dgram.createSocket('udp4');

// Handle incoming messages
server.on('message', (msg, rinfo) => {
  console.log(`Server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  //console.log(msg.toString('hex'));
  mqttPublish(msg);

});

// Handle server listening event
server.on('listening', () => {
  const address = server.address();
  console.log(`Server listening on ${address.address}:${address.port}`);
});

// Handle any errors
server.on('error', (err) => {
  console.error(`Server error:\n${err.stack}`);
  server.close();
});

// Bind the server to a port
const PORT = 38560;
const HOST = '206.189.116.138';
server.bind(PORT, HOST);