const amqp = require("amqplib");
const generateCSV = require("../reports/csvReports");
const generatePDF = require("../reports/pdfReports");

async function consumeQueue(queueName) {
  try {
    const connection = await amqp.connect("amqp://rabbitmq");
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    console.log("Aguardando mensagens...");

    channel.consume(queueName, async (msg) => {
      const content = JSON.parse(msg.content.toString());
      console.log("Mensagem recebida:", content);

      if (content.status === "confirmed") {
        await generateCSV([content]);
        await generatePDF([content]);
      }

      channel.ack(msg);
    });
  } catch (error) {
    console.error("Erro ao consumir fila:", error);
  }
}

consumeQueue("paymentQueue");
