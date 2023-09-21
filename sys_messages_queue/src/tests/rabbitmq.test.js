const { connectToRabbitForTest } = require("../dbs/init.rabbit");

describe("RabbitMQ connection", () => {
  it("Should connect to successful RabbitMQ", async () => {
    const result = await connectToRabbitForTest();
    expect(result).toBeUndefined();
  });
});
