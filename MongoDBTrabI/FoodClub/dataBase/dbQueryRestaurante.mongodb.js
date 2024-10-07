// Listar nome dos restaurantes
use('FoodClub') // Seleciona o banco de dados "FoodClub" para realizar operações de consulta.

db.restaurantes.find({}, {nome:1, _id:0}) // Faz uma consulta na coleção 'restaurantes' para retornar todos os documentos, mas apenas com o campo 'nome' (indicado por nome: 1). O campo '_id' é excluído da saída (indicado por _id: 0).

// Nome que contém RE ou CARNE
use('FoodClub') // Seleciona o banco de dados "FoodClub" novamente para realizar uma nova consulta.

db.pratos.find({ nome: { $regex: /carne/i } }, {nome:1, _id:0}) // Busca na coleção 'pratos' documentos cujo campo 'nome' contenha a palavra "carne" (usando expressão regular, onde o modificador 'i' indica que a busca não é sensível a maiúsculas e minúsculas). Retorna apenas o campo 'nome' e exclui o campo '_id'.

// Selecionar Restaurante fora de Sorocaba
use('FoodClub') // Seleciona o banco de dados "FoodClub".

db.restaurantes.find({ cep: { $not: /^18[0-1]\d{2}-\d{3}$/ } }) // Faz uma busca na coleção 'restaurantes' para encontrar restaurantes cujo campo 'cep' não corresponde ao padrão especificado pela expressão regular. O padrão indica que os CEPs dentro da faixa de 18.000 a 18.199 (Sorocaba) devem ser excluídos. O operador $not inverte a condição da consulta.

// Listar pratos do Restaurante pelo id
use('FoodClub') // Seleciona o banco de dados "FoodClub".

db.pratos.find({ id_restaurante: "66f206e4054b2f6345c63648" }) // Busca na coleção 'pratos' os documentos que têm o campo 'id_restaurante' igual ao ID especificado. Isso retorna todos os pratos que pertencem ao restaurante com o ID dado.

// Localizar restaurantes em um raio de 10km da prefeitura de Sorocaba e listar os pratos (-23.502639319232085, -47.45335585792438)
use('FoodClub'); // Seleciona o banco de dados "FoodClub".

db.restaurantes.find( // Inicia uma consulta para localizar restaurantes com base em critérios geoespaciais.
  {
    local: { // Especifica o campo 'local' da coleção 'restaurantes' para a consulta.
      $geoWithin: { // Usa o operador $geoWithin para buscar documentos que estão dentro de uma área geográfica especificada.
        $centerSphere: [ // Define um círculo geográfico como a área de busca.
          [-47.45335585792438, -23.502639319232085], // Coordenadas da Prefeitura de Sorocaba (longitude, latitude).
          10 / 6378.1 // Raio em radianos (10 km convertido para radianos dividindo por 6378.1, que é o raio da Terra em km).
        ]
      }
    }
  },
  {
    nome: 1, // Retorna o campo 'nome' dos restaurantes encontrados.
    _id: 0 // Exclui o campo '_id' da saída.
  }
)

// Pegar as coordenadas pelo nome da rua
use('FoodClub') // Seleciona o banco de dados "FoodClub".

db.restaurantes.find({ // Inicia uma consulta na coleção 'restaurantes'.
  "local.rua": /Alameda das Primaveras/i // Busca documentos cujo campo 'local.rua' contenha "Alameda das Primaveras", sem considerar maiúsculas e minúsculas (expressão regular).
}, {
  "local.coordinates": 1, // Retorna o campo 'local.coordinates' que contém as coordenadas geográficas.
  "local.rua": 1 // Retorna também o campo 'local.rua'.
})
