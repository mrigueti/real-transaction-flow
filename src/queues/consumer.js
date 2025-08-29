const amqp = require("amqplib");

async function consumeQueue(queueName) {
  try {
    const connection = await amqp.connect("amqp://rabbitmq");
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    console.log("Aguardando mensagens...");

    channel.consume(queueName, async (msg) => {
      const content = JSON.parse(msg.content.toString());
      console.log("Mensagem recebida:", content);
      channel.ack(msg);
    });
  } catch (error) {
    console.error("Erro ao consumir fila:", error);
  }
}

consumeQueue("paymentQueue");
