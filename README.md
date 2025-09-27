Baixe a imagem do mongo:
```
docker pull mongodb/mongodb-community-server:latest
```
Cria e inicia um novo container Docker, executando o servidor de banco de dados MongoDB Community Server em segundo plano
````
docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
```

Para iniciar o container
```
docker start mongodb
```