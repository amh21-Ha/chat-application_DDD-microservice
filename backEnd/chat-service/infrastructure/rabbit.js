const amqp = require('amqplib');

let channel;

const connectRabbitMQ = async () => {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    console.log('RabbitMQ connected');
};

const sendMessage = async (queue, message) => {
    channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
};

module.exports = { connectRabbitMQ, sendMessage };
