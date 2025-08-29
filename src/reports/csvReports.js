const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const path = require("path");

async function generateCSV(data) {
  const csvWriter = createCsvWriter({
    path: path.resolve(__dirname, "sales.csv"),
    header: [
      { id: "id", title: "ID" },
      { id: "amount", title: "Amount" },
      { id: "status", title: "Status" },
    ],
  });
  await csvWriter.writeRecords(data);
  console.log("CSV gerado!");
}

// Exemplo de uso
generateCSV([
  { id: 1, amount: 100, status: "paid" },
  { id: 2, amount: 200, status: "paid" },
]);
