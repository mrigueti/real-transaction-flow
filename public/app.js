document.getElementById("payButton").addEventListener("click", async () => {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = "Processando...";

  try {
    const response = await fetch(
      "http://localhost:3000/payments/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ name: "Barra de chocolate", amount: 10, quantity: 1 }],
        }),
      }
    );

    const { url } = await response.json();
    window.location.href = url;
  } catch (error) {
    messageDiv.textContent = "Erro ao processar pagamento.";
    console.error(error);
  }
});
