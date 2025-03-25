-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS cepincis_db;

-- Seleciona o banco de dados que será utilizado
USE cepincis_db;

-- Criação da tabela de usuários
CREATE TABLE
  IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY, -- ID do usuário (auto increment)
    nome VARCHAR(255) NOT NULL, -- Nome do usuário
    email VARCHAR(255) NOT NULL UNIQUE, -- E-mail do usuário (único)
    senha VARCHAR(255) NOT NULL -- Senha do usuário
  );

-- Criação da tabela de postagens
CREATE TABLE
  IF NOT EXISTS postagens (
    id INT AUTO_INCREMENT PRIMARY KEY, -- ID da postagem (auto increment)
    titulo VARCHAR(255) NOT NULL, -- Título da postagem
    descricao VARCHAR(255) NOT NULL, -- Descrição curta (exibição em cards)
    conteudo TEXT NOT NULL, -- Conteúdo completo da postagem
    tags VARCHAR(255) NOT NULL, -- Tags associadas à postagem (ex: "tecnologia, ia")
    data_publicacao DATETIME DEFAULT CURRENT_TIMESTAMP -- Data de publicação
  );