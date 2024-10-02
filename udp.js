import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load environment variables from the .env file
config({ path: resolve(dirname(fileURLToPath(import.meta.url)), '.env') });

import dgram from 'dgram';
import { mqttPublish } from './mqtt.js';

// Create a UDP server
const server = dgram.createSocket('udp4');

// Handle incoming messages
server.on('message', (msg, rinfo) => {
  let message = msg.toString('hex');
  console.log(`Server got: ${message} from ${rinfo.address}:${rinfo.port}`);
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
const PORT = process.env.udpIotserverPort;
const HOST = process.env.udpIotserverAddr;
server.bind(PORT, HOST);