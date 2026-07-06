// URL do backend. Em desenvolvimento/Docker Compose aponta para localhost:3001.
const API_URL = "http://localhost:3001/api/mensagem";

const form = document.getElementById("form");
const input = document.getElementById("mensagem");
const resposta = document.getElementById("resposta");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const mensagem = input.value.trim();
  if (!mensagem) return;

  resposta.hidden = false;
  resposta.className = "resposta";
  resposta.textContent = "Enviando...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensagem }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.erro || "Erro no servidor");
    }

    resposta.classList.add("ok");
    resposta.textContent = `✅ Backend respondeu: "${data.status}" (msg: "${data.mensagemOriginal}")`;
    input.value = "";
  } catch (err) {
    resposta.classList.add("erro");
    resposta.textContent = `❌ ${err.message}`;
  }
});
