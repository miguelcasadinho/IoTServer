import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import mqtt from 'mqtt';

// Load environment variables from the .env file
config({ path: resolve(dirname(fileURLToPath(import.meta.url)), '.env') });

// MQTT broker connection options
const options = {
    port: process.env.mqttIotserverPort,   // Read the port from the .env file
    username: process.env.mqttIotserverUser, // Username from the .env
    password: process.env.mqttIotserverPass, // Password from the .env
    // Optionally specify clientId or other options if needed
};

// Function to publish a message to the MQTT broker
const mqttPublish = (message) => {
    try {
        // Connect to an MQTT broker with the provided address and options
        const client = mqtt.connect(process.env.mqttIotserverAddr, options);

        // Event handler for when the client successfully connects
        client.on('connect', () => {
            console.log('Connected to MQTT broker');

            // Publish the message to the 'xlogic' topic
            client.publish('xlogic', message, (error) => {
                if (error) {
                    console.error('Publish error:', error);
                } else {
                    console.log('Published to xlogic topic');
                }

                // End the connection after publishing
                client.end();
            });
        });

        // Handle errors during connection
        client.on('error', (error) => {
            console.error('MQTT Connection Error:', error);
        });

    } catch (error) {
        console.error("Error sending message:", error);
    }
};

export { mqttPublish };