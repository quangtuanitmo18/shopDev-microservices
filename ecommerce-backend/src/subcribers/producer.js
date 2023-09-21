const amqplib = require("amqplib");
const amqpUri =
  "amqps://lwarvrch:O31bKfYuJVIZ343ynFPXVdi-EMgSYsqR@armadillo.rmq.cloudamqp.com/lwarvrch";

const sendMessage = async ({ msg, address }) => {
  try {
    // 1. create connect
    const conn = await amqplib.connect(amqpUri);

    // 2. create channel
    const channel = await conn.createChannel();

    // 3. create name queue
    const nameQueue = address;
    await channel.assertQueue(nameQueue, {
      durable: true, // neu false thi se mat du lieu khi server crash
    });

    // 5. send message
    await channel.sendToQueue(nameQueue, Buffer.from(msg), {});

    // 6. close conn and channel
  } catch (error) {
    console.error(error);
  }
};

const msg = process.argv.slice(2).join(" ") || "Hello";
sendMessage({ msg: msg, address: "test-topic" });
