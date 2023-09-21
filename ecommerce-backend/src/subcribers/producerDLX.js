const amqplib = require("amqplib");
const amqpUri =
  "amqps://lwarvrch:O31bKfYuJVIZ343ynFPXVdi-EMgSYsqR@armadillo.rmq.cloudamqp.com/lwarvrch";

const sendMessage = async () => {
  try {
    const connection = await amqplib.connect(amqpUri);
    const channel = await connection.createChannel();

    const notificationExchange = "notificationEx"; //notificationEx direct
    const notiQueue = "notificationQueueProcess"; // assert queue
    const notificationExchangeDLX = "notificationExDLX"; //notificationEx direct
    const notificationRoutingDLX = "notificationRoutingKeyDLX"; //assert

    // 1. create exchange

    await channel.assertExchange(notificationExchange, "direct", {
      durable: true, // neu false thi se mat du lieu khi server crash
    });
    // 2. create queue
    const queueResult = await channel.assertQueue(notiQueue, {
      exclusive: false,
      deadLetterExchange: notificationExchangeDLX,
      deadLetterRoutingKey: notificationRoutingDLX,
    });

    // 3 bind queue
    await channel.bindQueue(queueResult.queue, notificationExchange);

    // 4 send message
    const msg = "a new product";
    console.log("product msg ::", msg);
    // mess chi ton tai trong 10s
    await channel.sendToQueue(queueResult.queue, Buffer.from(msg), {
      expiration: "10000",
    });
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error("error::", error);
  }
};

// const msg = process.argv.slice(2).join(" ") || "Hello";
sendMessage();
