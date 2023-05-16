# API COPA

<h1 name="sobre">ℹ Sobre o Projeto</h1>
Uma API em NodeJS que gerencia informações de Jogos da Copa 2022 🎯

- ### **Pré-requisitos**

  - É **necessário** possuir o **[Node.js](https://nodejs.org/en/)** instalado no computador
  - É **necessário** possuir o **[Git](https://git-scm.com/)** instalado e configurado no computador
  - Também, é **preciso** ter um gerenciador de pacotes seja o **[NPM](https://www.npmjs.com/)** ou **[Yarn](https://yarnpkg.com/)**.

```bash
# Clone Repository
$ git clone https://github.com/IanaCris/api-copa.git
```

<h3 name='api'>📦 Instala as Dependências</h3><br>

```bash
# Vá até a pasta
$ cd api-copa
# Instale as dependências
$ npm install # ou yarn
# Cria o banco de dados com prisa client
$ npx prisma migrate dev
# Executa a aplicação
$ npm run dev
```

<h1 name="tecnologias">🛠 Tecnologias</h1>

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://www.fastify.io/)
- [Prisma ORM](https://www.prisma.io/)
- [SqLite](https://www.sqlite.org/)
