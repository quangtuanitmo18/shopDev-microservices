"use strict";

const {
  consumerToQueue,
  consumerToQueueNormal,
  consumerToQueueFailed,
} = require("./src/services/consumerQueue.service");

const queueName = "test-topic";
// consumerToQueue(queueName)
//   .then(() => {
//     console.log(`Message consumer started ${queueName}`);
//   })
//   .catch((error) => {
//     console.log("Error", error);
//   });
consumerToQueueNormal(queueName)
  .then(() => {
    console.log(`Message consumerToQueueNormal started ${queueName}`);
  })
  .catch((err) => {
    console.error("Message error:", err);
  });
consumerToQueueFailed(queueName)
  .then(() => {
    console.log(`Message consumerToQueueFailed started ${queueName}`);
  })
  .catch((err) => {
    console.error("Message error:", err);
  });
