"use strict";

const { connectToRabbitMQ, consumerQueue } = require("../dbs/init.rabbit");

const log = console.log;

console.log = function () {
  log.apply(console, [new Date()].concat(arguments));
};

const messageService = {
  consumerToQueue: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      await consumerQueue(channel, queueName);
    } catch (error) {
      console.error("Error consumerQueue", error);
    }
  },
  consumerToQueueNormal: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      const notiQueue = "notificationQueueProcess";
      // setTimeout(() => {
      channel.consume(notiQueue, (msg) => {
        try {
          const numberTest = Math.random();
          console.log(numberTest);
          if (numberTest < 0.5) {
            // console.log("dsdsd");
            throw new Error("Send notification failed::hotfix");
          }
          console.log(
            "SEND notificationQueue successfully processed:",
            msg.content.toString()
          );
          channel.ack(msg);
        } catch (error) {
          console.log("SEND notificationQueue error:", error);
          channel.nack(msg, false, false);
        }
      });
      // }, 15000);
    } catch (error) {
      console.error(error);

      // throw error;
    }
  },
  consumerToQueueFailed: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      const notificationExchangeDLX = "notificationExDLX"; //notificationEx direct
      const notificationRoutingDLX = "notificationRoutingKeyDLX"; //assert
      const notificationHandler = "notificationQueueHotFix";

      await channel.assertExchange(notificationExchangeDLX, "direct", {
        durable: true,
      });
      const queueResult = await channel.assertQueue(notificationHandler, {
        exclusive: false,
      });
      await channel.bindQueue(
        queueResult.queue,
        notificationExchangeDLX,
        notificationRoutingDLX
      );
      await channel.consume(
        queueResult.queue,
        (msgFailed) => {
          console.log(
            "this notification error, pls hot fix::",
            msgFailed.content.toString()
          );
        },
        {
          noAck: true,
        }
      );
    } catch (error) {
      console.error(`consumer to failed ${error}`);
      throw error;
    }
  },
};

module.exports = messageService;
