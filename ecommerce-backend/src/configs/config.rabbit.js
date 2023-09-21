const amqp = require("amqplib");
const { BusinessLogicError } = require("../core/error.response");

const amqpUri =
  "amqps://lwarvrch:O31bKfYuJVIZ343ynFPXVdi-EMgSYsqR@armadillo.rmq.cloudamqp.com/lwarvrch";

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(amqpUri);
    if (!connection) throw new BusinessLogicError("Connect not established");

    const channel = await connection.createChannel();
    return { channel, connection };
  } catch (err) {
    console.error(err);
  }
};

const connectToRabbitForTest = async () => {
  try {
    const { channel, connection } = await connectToRabbitMQ();

    const queue = "test-queue";
    const message = "hello, tiger test";
    await channel.assertQueue(queue);

    await channel.sendToQueue(queue, Buffer.from(message));

    await connection.close();
  } catch (err) {
    console.error(err);
  } finally {
  }
};

module.exports = {
  connectToRabbitMQ,
  connectToRabbitForTest,
};
