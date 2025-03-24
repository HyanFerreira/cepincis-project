-- Inserir usuário teste (admin)
INSERT INTO `cepincis_db`.`usuarios` (`id`, `nome`, `email`, `senha`) 
VALUES 
  ('1', 'admin', 'admin@cepincis.com', 'admin');

-- Inserir tags
INSERT INTO `cepincis_db`.`tags` (`id`, `nome`) 
VALUES 
  (NULL, 'IoT'),
  (NULL, 'CarbonZero'),
  (NULL, 'UrbSmart'),
  (NULL, 'EcoMat'),
  (NULL, 'EduCIS');

-- Inserir postagens de teste
INSERT INTO `cepincis_db`.`postagens` (`id`, `titulo`, `descricao`, `conteudo`, `data_publicacao`) 
VALUES 
  (NULL, 'Como Otimizar seu Código JavaScript com IA', 
   'Dicas essenciais para melhorar a performance do seu código JavaScript utilizando Inteligência Artificial.', 
   'Neste post teste, vamos explorar várias técnicas para otimizar seu código JavaScript, como minimizar o uso de loops desnecessários, otimizar o DOM e muito mais. A otimização é fundamental para garantir que seu site ou aplicação funcione de maneira rápida e eficiente, sem comprometer a experiência do usuário.', 
   '2025-03-20'),
   
  (NULL, 'Introdução ao Desenvolvimento Web Responsivo', 
   'Entenda como criar layouts que se adaptam a diferentes dispositivos.', 
   'O desenvolvimento web responsivo é uma abordagem que visa criar páginas que funcionam bem em uma variedade de dispositivos e tamanhos de tela. Vamos passar por conceitos importantes, como media queries, unidades relativas e boas práticas para garantir que seu site seja acessível e de fácil leitura em qualquer dispositivo.', 
   '2025-03-17'),
   
  (NULL, 'Melhores práticas de segurança em APIs', 
   'Aprenda a proteger suas APIs contra ataques comuns.', 
   'As APIs são um ponto de vulnerabilidade comum em muitas aplicações. Neste post, vamos abordar as melhores práticas para proteger suas APIs, como autenticação e autorização, validação de entradas e o uso de HTTPS. Manter suas APIs seguras é fundamental para garantir a integridade dos dados e a confiança dos usuários.', 
   '2025-03-14');

-- Associar tags aos postagens (Muitas para Muitos)
-- Post 1 (Como Otimizar seu Código JavaScript com IA)
INSERT INTO `cepincis_db`.`post_tags` (`post_id`, `tag_id`) 
VALUES 
  (1, 1), -- IoT
  (1, 2); -- CarbonZero

-- Post 2 (Introdução ao Desenvolvimento Web Responsivo)
INSERT INTO `cepincis_db`.`post_tags` (`post_id`, `tag_id`) 
VALUES 
  (2, 3), -- UrbSmart
  (2, 4); -- EcoMat

-- Post 3 (Melhores práticas de segurança em APIs)
INSERT INTO `cepincis_db`.`post_tags` (`post_id`, `tag_id`) 
VALUES 
  (3, 5); -- EduCIS
