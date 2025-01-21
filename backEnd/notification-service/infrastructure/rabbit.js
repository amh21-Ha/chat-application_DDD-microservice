const amqp = require('amqplib');

const createChannel = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
        return channel;
    } catch (error) {
        console.error('RabbitMQ connection failed:', error);
        throw error;
    }
};

module.exports = { createChannel };
