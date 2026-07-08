import { createApp } from "./app.js";

const PORT = process.env.PORT || 3001;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Backend Node.js rodando em http://localhost:${PORT}`);
});
