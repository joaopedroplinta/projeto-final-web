FROM node:18.20.8-bullseye

WORKDIR /app

# Install dependencies (no need for --build-from-source)
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "src/server.js"]