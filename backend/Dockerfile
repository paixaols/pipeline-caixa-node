FROM node:20-alpine

WORKDIR /app

# Instala apenas dependências de produção primeiro (melhor cache de camadas).
COPY package.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 3001
CMD ["node", "server.js"]
