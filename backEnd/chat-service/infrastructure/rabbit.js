const amqp = require('amqplib');

let connection;
let channel;

const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        console.log('RabbitMQ connected');
        
        // Handle connection close events
        connection.on('close', () => {
            console.log('RabbitMQ connection closed. Reconnecting...');
            setTimeout(connectRabbitMQ, 5000); // Reconnect after 5 seconds
        });

        connection.on('error', (err) => {
            console.error('RabbitMQ connection error:', err);
        });

    } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
        setTimeout(connectRabbitMQ, 5000); // Retry connection after 5 seconds
    }
};

const sendMessage = async (queue, message) => {
    try {
        if (!channel) {
            console.error('RabbitMQ channel is not initialized');
            return;
        }

        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
        console.log(`Message sent to queue "${queue}":`, message);
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

// Gracefully close connection on exit
process.on('SIGINT', async () => {
    if (connection) {
        await connection.close();
        console.log('RabbitMQ connection closed.');
        process.exit(0);
    }
});

module.exports = { connectRabbitMQ, sendMessage };
