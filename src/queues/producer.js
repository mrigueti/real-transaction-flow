const amqp = require("amqplib");

async function sendToQueue(queueName, message) {
  try {
    const connection = await amqp.connect("amqp://rabbitmq");
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    console.log("Mensagem enviada para a fila:", message);
    setTimeout(() => connection.close(), 500);
  } catch (error) {
    console.error("Erro ao enviar mensagem para a fila:", error);
  }
}

module.exports = sendToQueue;
