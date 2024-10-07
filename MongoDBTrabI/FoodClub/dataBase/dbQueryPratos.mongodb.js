db.pratos.find(); // Faz uma consulta para listar todos os pratos da coleção 'pratos'.

use('FoodClub') // Seleciona novamente o banco de dados "FoodClub".
db.pratos.find({}, {nome: 1, _id:0}) // Retorna apenas os nomes dos pratos, omitindo o campo '_id' (definido como 0).

use('FoodClub') // Seleciona o banco de dados "FoodClub" para executar outra consulta.
db.pratos.find({ preco: { $gt: 15, $lt: 20 } }) // Busca pratos cujo preço seja maior que 15 ($gt) e menor que 20 ($lt).

use('FoodClub') // Seleciona o banco de dados "FoodClub".
db.pratos.find({ nome: { $regex: /frango|carne/i } }) // Usa expressão regular para encontrar pratos cujos nomes contenham 'frango' ou 'carne', ignorando diferenças de maiúsculas e minúsculas (modificador 'i').
