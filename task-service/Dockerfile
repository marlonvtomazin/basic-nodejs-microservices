FROM node:18
WORKDIR /app
# Copia o package para a raiz do projeto "/app"
COPY package*.json ./
RUN npm install
#Copia tudo da base da imagem para o WORKDIR
COPY . .
EXPOSE 3002
CMD ["node", "index.js"]