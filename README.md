# IoT Server with MQTT Broker and UDP Server

This project implements an IoT server that combines an MQTT broker with a UDP server. The server listens for incoming UDP messages and publishes them to the MQTT broker.

## Features

- **MQTT Broker**: Acts as the message broker, managing publish-subscribe messaging between devices.
- **UDP Server**: Listens for incoming UDP packets from IoT devices.
- **Message Forwarding**: Forwards UDP messages received to the MQTT broker as MQTT topics.

## Components

1. **MQTT Broker**: 
   - The MQTT broker is responsible for managing clients and facilitating message exchange via topics. Popular brokers like Mosquitto or EMQX can be used.
   
2. **UDP Server**: 
   - A simple UDP server is implemented to receive UDP packets. These packets typically contain sensor data or control messages from IoT devices.

3. **Message Processing**: 
   - Upon receiving a UDP message, it is processed and then published to the MQTT broker under a specified topic.
