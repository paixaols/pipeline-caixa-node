import express from "express";
import cors from "cors";

// Cria e configura a aplicação Express.
// Separamos a criação do app (aqui) da inicialização do servidor (server.js)
// para que os testes possam importar o app sem abrir uma porta de rede.
export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Health check — usado pelo Docker e pela pipeline para saber se está de pé.
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Endpoint principal: recebe { mensagem } e responde "recebido".
  app.post("/api/mensagem", (req, res) => {
    const { mensagem } = req.body ?? {};

    if (typeof mensagem !== "string" || mensagem.trim() === "") {
      return res.status(400).json({ erro: "Campo 'mensagem' é obrigatório." });
    }

    return res.status(200).json({
      status: "recebido",
      mensagemOriginal: mensagem,
      recebidoEm: new Date().toISOString(),
    });
  });

  return app;
}
