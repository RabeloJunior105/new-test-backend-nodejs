Teste de candidato a analista de back-end
Caro desenvolvedor,
Bem-vindo ao teste de candidato a analista de back-end. Este teste tem como objetivo avaliar seus conhecimentos gerais e velocidade de desenvolvimento. Abaixo, você encontrará os detalhes e requisitos para este teste.

O desafio

Sua tarefa é desenvolver uma API usando Node.js para um sistema de gerenciamento de catálogo de produtos em um aplicativo de mercado. Você deve analisar e converter as seguintes histórias de usuários em rotas para o aplicativo:

Histórias de usuários:

Como usuário, desejo cadastrar um produto junto ao seu proprietário, para futuramente poder acessar seus dados (título, descrição, preço, categoria, ID do proprietário).

Como usuário, desejo cadastrar uma categoria junto ao seu proprietário, para poder futuramente acessar seus dados (título, descrição, ID do proprietário).

Como usuário, quero associar um produto a uma categoria.

Como usuário, desejo atualizar os dados de um produto ou categoria.

Como usuário, desejo excluir um produto ou categoria do meu catálogo.

Um produto só pode ser associado a uma categoria por vez.

Suponha que os produtos e categorias pertençam apenas a um proprietário.

Lembre-se de que este é um catálogo de produtos online, o que significa que haverá várias solicitações de edição de itens/categorias por segundo, bem como de acesso ao endpoint de pesquisa do catálogo.

Considere o catálogo de produtos como uma compilação JSON de todas as categorias e itens disponíveis de propriedade de um usuário. Dessa forma, o terminal de pesquisa do catálogo não precisa buscar informações no banco de dados.

Sempre que houver uma alteração no catálogo de produtos, publique essa alteração no tópico "catalog-emit" do serviço AWS SQS.

Implemente um consumidor que ouça alterações de catálogo para um proprietário específico.

Quando o consumidor receber uma mensagem, pesquise no banco de dados o catálogo desse proprietário, gere o JSON do catálogo e publique-o em um bucket de serviço AWS S3.

Você precisa desenvolver este teste usando as seguintes tecnologias:

MongoDB para o banco de dados.
AWS SQS para notificações de alteração de catálogo.
AWS S3 para armazenar o catálogo JSON.
Node.js para back-end.
Express.js como estrutura da web.
Diagrama representando a estrutura final do projeto:

![image]( https://github.com/githubanotaai/new-test-backend-nodejs/assets/52219768/504ba448-f128-41db-ae86-18dc19c0dc9d )
Instruções

Para iniciar o teste, bifurque este repositório, crie um branch com seu nome completo e envie-nos o link do seu teste concluído (link para o seu repositório). Se você apenas clonar o repositório, não será possível enviar alterações por push, tornando a solicitação pull mais complicada.

Use sua própria conta AWS para configurar os serviços necessários.
Atualize o arquivo README com instruções sobre como executar seu aplicativo.
Cole o nome da filial no sistema GUPY e indique a conclusão do teste.
Sinta-se à vontade para nos fornecer comentários sobre o teste.
Nossos critérios de avaliação Avaliaremos os seguintes aspectos da sua solução:

Conhecimento de JavaScript, Node.js e Express.js.
Estrutura adequada das camadas de aplicação.
Tratamento de chamadas de saída.
Uso eficaz de variáveis ​​de ambiente.
Implementação de testes unitários.
Mecanismos de registro.
Estratégias de tratamento de erros.
Qualidade da documentação.
Organização do código, separação de módulos, legibilidade e comentários.
Confirmar histórico.