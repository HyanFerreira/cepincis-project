-- Inserção do usuário admin
INSERT INTO usuarios (nome, email, senha) 
VALUES ('Admin', 'admin@cepincis.com', 'admin_cepincis');

-- Inserção das postagens
INSERT INTO postagens (titulo, descricao, conteudo, tags, data_publicacao)
VALUES 
  ('Como Otimizar seu Código JavaScript com IA', 
   'Dicas essenciais para melhorar a performance do seu código JavaScript utilizando Inteligência Artificial.', 
   'Neste post teste, vamos explorar várias técnicas para otimizar seu código JavaScript, como minimizar o uso de loops desnecessários, otimizar o DOM e muito mais. A otimização é fundamental para garantir que seu site ou aplicação funcione de maneira rápida e eficiente, sem comprometer a experiência do usuário.', 
   'IoT, CarbonZero, UrbSmart', 
   '2025-01-14'),
   
  ('Introdução ao Desenvolvimento Web Responsivo', 
   'Entenda como criar layouts que se adaptam a diferentes dispositivos.', 
   'O desenvolvimento web responsivo é uma abordagem que visa criar páginas que funcionam bem em uma variedade de dispositivos e tamanhos de tela. Vamos passar por conceitos importantes, como media queries, unidades relativas e boas práticas para garantir que seu site seja acessível e de fácil leitura em qualquer dispositivo.', 
   'EcoMat, EduCIS', 
   '2025-02-12'),
   
  ('Melhores práticas de segurança em APIs', 
   'Aprenda a proteger suas APIs contra ataques comuns.', 
   'As APIs são um ponto de vulnerabilidade comum em muitas aplicações. Neste post, vamos abordar as melhores práticas para proteger suas APIs, como autenticação e autorização, validação de entradas e o uso de HTTPS. Manter suas APIs seguras é fundamental para garantir a integridade dos dados e a confiança dos usuários.', 
   'IoT, CarbonZero, EcoMat', 
   '2025-03-20');

-- Explorando o Futuro da Inteligência Artificial no Cotidiano
-- Descubra como a IA está mudando nosso dia a dia e o que esperar para o futuro.
-- A inteligência artificial (IA) tem se infiltrado em diversas áreas da nossa vida cotidiana, desde assistentes virtuais como o Google Assistente até carros autônomos. Neste artigo, exploraremos como a IA está moldando diferentes indústrias, desde a medicina até o setor de transportes, e o que podemos esperar dela nos próximos anos. Acompanhe-nos enquanto discutimos as inovações mais empolgantes e os desafios que surgem com essa tecnologia emergente.