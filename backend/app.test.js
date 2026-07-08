import { test } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "./app.js";

const app = createApp();

// Sobe o servidor numa porta aleatória apenas durante os testes.
function startServer() {
  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      const { port } = server.address();
      resolve({ server, baseUrl: `http://localhost:${port}` });
    });
  });
}

test("GET /health responde ok", async () => {
  const { server, baseUrl } = await startServer();
  try {
    const res = await fetch(`${baseUrl}/health`);
    const body = await res.json();
    assert.equal(res.status, 200);
    assert.equal(body.status, "ok");
  } finally {
    server.close();
  }
});

test("POST /api/mensagem responde 'recebido'", async () => {
  const { server, baseUrl } = await startServer();
  try {
    const res = await fetch(`${baseUrl}/api/mensagem`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensagem: "Olá, turma!" }),
    });
    const body = await res.json();
    assert.equal(res.status, 200);
    assert.equal(body.status, "recebido");
    assert.equal(body.mensagemOriginal, "Olá, turma!");
  } finally {
    server.close();
  }
});

test("POST /api/mensagem rejeita mensagem vazia", async () => {
  const { server, baseUrl } = await startServer();
  try {
    const res = await fetch(`${baseUrl}/api/mensagem`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensagem: "" }),
    });
    assert.equal(res.status, 400);
  } finally {
    server.close();
  }
});
