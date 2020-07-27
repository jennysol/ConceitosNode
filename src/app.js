const express = require("express");
const cors = require("cors");

 const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories); // Rota que liste todos os repositórios
});

app.post("/repositories", (request, response) => {
  const {title, url , techs } = request.body;

  const repository = { // Criando um objeto
    id: uuid(),
    title,
    url,
    techs,
    likes : 0,// likes começando em zero 
  }

  repositories.push(repository); // Colocando o repository dentro do array de repositories

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params; // Permanecer o mesmo id
  const { title, url, techs } = request.body; // Alterar estes dados 

  const findRepositoryIndex = repositories.findIndex(repository => // Prucorar nos arrays
    repository.id === id // findIndex > se não encontra retorna -1
  );

  if (findRepositoryIndex === -1){
    return response.status(400).json({ error: 'Repository does not exists.'});yar
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[findRepositoryIndex].likes, // Assim os likes não podem ser alterados manualmente
  };
  repositories[findRepositoryIndex] = repository;

  return response.json(repository);
});
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params; // Procurar pelos id

  const findRepositoryIndex = repositories.findIndex(repository => // Prucorar nos arrays
    repository.id === id // findIndex > se não encontra retorna -1
    );

    if (findRepositoryIndex >= 0) {
      repositories.splice(findRepositoryIndex, 1); // Executa a remoção 
    } else {
      return response.status(400).json({ error: 'Repository does not exists.'}); // Caso não seja encontrado imprimir na tela 
    }

    return response.status(204).send(); // Adiconar status e retornar pasta vazia 
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository => 
    repository.id === id 
  );

  if (findRepositoryIndex === -1) {
    return response.status(400).json({error: 'Repository does not exists.'});
  }

  repositories[findRepositoryIndex].likes +=1;

  return response.json(repositories[findRepositoryIndex]);
});

module.exports = app;
