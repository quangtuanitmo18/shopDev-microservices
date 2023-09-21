const amqp = require("amqplib");

const amqpUri =
  "amqps://lwarvrch:O31bKfYuJVIZ343ynFPXVdi-EMgSYsqR@armadillo.rmq.cloudamqp.com/lwarvrch";

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(amqpUri);
    if (!connection) throw new Error("Connect not established");

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
const consumerQueue = async (channel, queueName) => {
  try {
    await channel.assertQueue(queueName, { durable: true });
    console.log(`Waiting for messages…`);
    channel.consume(
      queueName,
      (msg) => {
        console.log(
          "Received message: ${queue Name)::",
          msg.content.toString()
        );
        // 1 . find user following that shop
        // 2. Send message to user
        // 3. yes oke-> success
        // 4. error, setup dle dead letter exxchanges (hand doi chet) khi co loi no se day den hang doi chet
        // Trong rabbit Queue có 3 loại để đưa vào dlx
        // 1 chúng ta xử lý bị lỗi, notify bị từ chối
        // 2 hết hạn tin nhắn
        // 3 độ dài hàng đợi tối đa
      },
      {
        noAck: true, // And oil neu nhu bi loi the he thong xul
      }
    );
  } catch (error) {
    console.log("error publish message to rabbitMq::", error);
    throw error;
  }
};

module.exports = {
  connectToRabbitMQ,
  connectToRabbitForTest,
  consumerQueue,
};
