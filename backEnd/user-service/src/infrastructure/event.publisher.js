const amqp = require('amqplib');

class EventPublisher {
  async publish(event, payload) {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const exchange = 'events';

    await channel.assertExchange(exchange, 'topic', { durable: true });
    channel.publish(exchange, event, Buffer.from(JSON.stringify(payload)));

    console.log(`Published event: ${event}`);
    await channel.close();
    await connection.close();
  }
}

module.exports = EventPublisher;
