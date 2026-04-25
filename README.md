## 🕵️ Sistema de Registro de Pessoas Desaparecidas (Project Missing)
Este é um MVP focado em impacto social, desenvolvido para centralizar o registro e a consulta de pessoas desaparecidas. A aplicação utiliza uma arquitetura robusta para garantir a persistência dos dados e o gerenciamento eficiente de mídias.

## 🏗️ Arquitetura do Projeto: Padrão MVC
O projeto foi estruturado utilizando o padrão Model-View-Controller, garantindo a separação de responsabilidades:

Model: Gerencia a lógica de dados e a comunicação com o SQLite via consultas estruturadas.

View: Interface do usuário construída com HTML5, CSS3 e Bootstrap, garantindo responsividade.

Controller: Intermeia as requisições do usuário, processa a lógica de negócio e retorna as respostas adequadas.



## 🛠️ Stack Tecnológica
### Front-end
HTML5 & CSS3: Estrutura e estilização base.

Bootstrap 5: Framework CSS para agilidade no layout responsivo e componentes de interface.

JavaScript: Lógica de consumo da API e manipulação do DOM.

### Back-end
Node.js & Express: Ambiente de execução e framework para criação da RESTful API.

Nodemon: Ferramenta de produtividade que reinicia o servidor automaticamente durante o desenvolvimento.

Multer: Middleware para manipulação de multipart/form-data, essencial para o upload de fotos dos registros.

Persistência e Armazenamento
SQLite: Banco de dados relacional leve para armazenamento local de registros e metadados.

Supabase (Cloud Storage): Utilizado para o armazenamento em nuvem das imagens enviadas, garantindo que os assets estejam disponíveis globalmente e não sobrecarreguem o servidor local.

### 📂 Organização de Pastas (Diretórios)
```
├── src/
│   ├── controllers/    # Lógica de controle e rotas
│   ├── infra           # Configuração da cloud storage(SupaBase)
|   ├── modules/        # Injeção de depedencia(onde tudo se conecta)
│   ├── routes/         # Definição dos endpoints da API
│   └── service/        # Configuração do Supabase e Multer
├── public/             # CSS, JS do front-end, Páginas HTML (se renderizadas no server) ou 
├── database/
|   |── config          # Configuração do Sqlite
|   ├── models/         # Definição do banco e queries        
├── .env                # Variáveis de ambiente (Keys do Supabase)
└── server.js           # Ponto de entrada da aplicação
```

## 🚀 Como Executar o MVP
Clone o repositório:

**git clone** [https://github.com/augustomohnnad/Registro-de-Pessoas-Desaparecidas.git]()
Instale as dependências:

```Bash
npm install
```
Configure as variáveis de ambiente:
Crie um arquivo .env com suas credenciais do Supabase.

Inicie o servidor em modo de desenvolvimento:

```Bash
npm run dev  # Comando configurado para o nodemon
```

## 🎓 Conceitos Aplicados para o Mercado
CRUD Completo: Implementação de criação, leitura, atualização e deleção de registros.

Middleware de Upload: Domínio do fluxo de arquivos entre cliente, servidor e nuvem.

Persistência Híbrida: Uso de banco local para agilidade e nuvem para arquivos pesados, uma prática comum em arquiteturas modernas.

## ☁️ Entendendo o Cloud Storage (Supabase)
No desenvolvimento de um MVP, um dos maiores desafios é gerenciar arquivos binários (como as fotos das pessoas desaparecidas). Salvar essas imagens diretamente no servidor ou no banco de dados SQLite não é uma prática escalável (o banco ficaria "pesado" e lento).

A solução adotada foi o uso de Cloud Storage (via Supabase), que funciona através do seguinte fluxo:

Interceptação (Multer): Quando o usuário faz o upload no formulário, o middleware Multer recebe o arquivo no backend.

Transferência (Stream): Em vez de salvar na pasta local do projeto, o servidor envia esse arquivo para um Bucket (um container de arquivos na nuvem) no Supabase.

Persistência de Referência: O Cloud Storage armazena o arquivo físico e retorna uma URL Pública.

Vinculação no Banco: No nosso banco SQLite, não salvamos a imagem, mas sim a String (URL) gerada. Assim, o banco permanece leve e a imagem é servida via CDN global.

## 🛠️ Dificuldade Encontrada e Superação
A maior dificuldade técnica foi a implementação da lógica de Upload Stream. Diferente de salvar um dado textual simples, o armazenamento em nuvem exige:

Configuração de políticas de segurança (CORS).

Tratamento de erros de conexão com a API externa.

Sincronização entre o envio do arquivo e o salvamento do registro no banco de dados.

Superar esse desafio permitiu que o projeto ganhasse características de uma aplicação de nível produção, garantindo que as fotos dos desaparecidos estejam sempre disponíveis, independentemente do estado do servidor backend.