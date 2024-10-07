const fs = require('fs'); // Importa o módulo 'fs' que fornece funcionalidades para interagir com o sistema de arquivos, permitindo ler e escrever arquivos.

const dadosRestaurantes = fs.readFileSync('/home/rafael/Documentos/Repositories/fatecDSM/Banco_de_Dados_Nao_Relacionais/FoodClub/json/restaurantes.json'); // Lê o arquivo 'restaurantes.json' de forma síncrona e armazena seu conteúdo em 'dadosRestaurantes'. O caminho relativo indica que o arquivo está dentro da pasta 'json'.

const jsonRestaurantes = JSON.parse(dadosRestaurantes); // Converte o conteúdo lido do arquivo, que está em formato de texto JSON, em um objeto JavaScript, armazenando o resultado em 'jsonRestaurantes'.

use('FoodClub') // Seleciona o banco de dados "FoodClub" para realizar operações a seguir. Este comando é usado para indicar em qual banco de dados queremos trabalhar.

db.restaurantes.insertMany(jsonRestaurantes); // Insere múltiplos documentos na coleção 'restaurantes' do banco de dados "FoodClub". Os dados inseridos são provenientes do objeto 'jsonRestaurantes', que contém as informações lidas do arquivo JSON.

use('FoodClub') // Novamente seleciona o banco de dados "FoodClub" (embora já esteja selecionado, esse comando pode ser redundante, mas é utilizado para clareza).

db.restaurantes.createIndex({ local: "2dsphere" }); // Cria um índice espacial em 2D esférico na coleção 'restaurantes', para o campo 'local'. Isso é importante para consultas geoespaciais, permitindo buscas eficientes com coordenadas geográficas.
