# AgendaDEV

![GitHub repo size](https://img.shields.io/github/repo-size/elvesbd/space-backend?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/elvesbd/space-backend?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/elvesbd/space-backend?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues-raw/elvesbd/space-backend?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/elvesbd/space-backend?style=for-the-badge)

<img src="https://i.imgur.com/4lPcElw.png" alt="imagem da API no swagger">

# Agenda Dev - Gerenciador de Contatos Avançado

O projeto "Agenda Dev" é um gerenciador de contatos que vai muito além de uma simples lista. Desenvolvido com técnicas avançadas de engenharia de software, este aplicativo utiliza uma arquitetura baseada em conceitos como Modelos Ricos, Value Objects e Testes Unitários para garantir a robustez e confiabilidade do sistema.

## Tecnologias Utilizadas

O projeto foi construído em [Node.js](https://nodejs.org/en) com o framework [Nest.js](https://nestjs.com/), proporcionando uma base sólida para a aplicação. Além disso, a camada de testes é suportada pelo [Jest](https://jestjs.io/), uma das principais ferramentas de teste no ecossistema JavaScript.

## Arquitetura Avançada

O coração da aplicação é completamente isolado do mundo externo, seguindo o princípio de Desacoplamento. Isso significa que o núcleo da aplicação, responsável pela lógica de negócios, não possui dependências diretas de bibliotecas ou frameworks externos, garantindo maior flexibilidade e facilidade de manutenção.

## Modelos Ricos e Value Objects

A aplicação utiliza o conceito de Modelos Ricos para representar de forma precisa e encapsulada as entidades do sistema. Isso significa que os objetos de domínio possuem não apenas dados, mas também comportamentos associados, resultando em uma modelagem mais expressiva e coesa.

Além disso, o uso de Value Objects garante a imutabilidade e a validação dos dados, evitando estados inconsistentes e contribuindo para a integridade dos dados.

## Testes Unitários

A integridade e confiabilidade do sistema são garantidas por meio de testes unitários abrangentes. Utilizando o Jest, cada componente e funcionalidade do sistema é testado individualmente, garantindo que as mudanças ou adições de código não afetem negativamente a aplicação.

## Portas e Adaptadores

O projeto segue o padrão de arquitetura hexagonal, onde as operações de entrada e saída são tratadas por "Portas" e "Adaptadores". Isso proporciona uma separação clara entre a lógica de negócios e a interação com o mundo externo, facilitando a substituição de componentes e a integração com outros sistemas.

## Rotas Implementadas

### Pessoas

#### \[GET\] /persons

- Descrição: Esta rota lista dados de pessoas com suporte para paginação e funcionalidade de busca.
- Endpoint: `/persons`
- Parâmetros de Consulta:
  - `search` (opcional): Termo de busca para filtrar pessoas.
  - `limit` (opcional): Limite do número de pessoas por página.
- Resposta: Lista de dados de pessoa.

#### \[POST\] /persons

- Descrição: Esta rota permite o registro de uma nova pessoa.
- Endpoint: `/persons`
- Corpo da Requisição: Dados da nova pessoa.
- Resposta: Dados da pessoa registrada.

#### \[PUT\] /persons/:id

- Descrição: Esta rota permite a edição dos dados de uma pessoa existente.
- Endpoint: `/persons/:id`
- Parâmetro de Rota: ID da pessoa a ser editada.
- Corpo da Requisição: Novos dados da pessoa.
- Resposta: Dados atualizados da pessoa.

#### \[PATCH\] /persons/:id/photo

- Descrição: Esta rota permite a atualização da foto de perfil de uma pessoa.
- Endpoint: `/persons/:id/photo`
- Parâmetro de Rota: ID da pessoa.
- Corpo da Requisição: Nova foto de perfil.
- Resposta: Foto de perfil atualizada com sucesso.

#### \[DELETE\] /persons/:id

- Descrição: Esta rota permite a exclusão de uma pessoa a partir do seu ID.
- Endpoint: `/persons/:id`
- Parâmetro de Rota: ID da pessoa a ser excluída.
- Resposta: Confirmação de exclusão.

### Empresas

#### \[GET\] /companies

- Descrição: Esta rota lista dados de empresas com suporte para paginação e funcionalidade de busca.
- Endpoint: `/companies`
- Parâmetros de Consulta:
  - `search` (opcional): Termo de busca para filtrar empresas.
  - `limit` (opcional): Limite do número de empresas por página.
- Resposta: Lista de dados de empresa.

#### \[POST\] /companies

- Descrição: Esta rota permite o registro de uma nova empresa.
- Endpoint: `/companies`
- Corpo da Requisição: Dados da nova empresa.
- Resposta: Dados da empresa registrada.

#### \[PUT\] /companies/:id

- Descrição: Esta rota permite a edição dos dados de uma empresa existente.
- Endpoint: `/companies/:id`
- Parâmetro de Rota: ID da empresa a ser editada.
- Corpo da Requisição: Novos dados da empresa.
- Resposta: Dados atualizados da empresa.

#### \[PATCH\] /companies/:id/photo

- Descrição: Esta rota permite a atualização do logotipo de uma empresa.
- Endpoint: `/companies/:id/photo`
- Parâmetro de Rota: ID da empresa.
- Corpo da Requisição: Novo logotipo.
- Resposta: Logotipo atualizado com sucesso.

#### \[DELETE\] /companies/:id

- Descrição: Esta rota permite a exclusão de uma empresa a partir do seu ID.
- Endpoint: `/companies/:id`
- Parâmetro de Rota: ID da empresa a ser excluída.
- Resposta: Confirmação de exclusão.

# Integrações

Neste projeto, utilizamos diversas integrações para otimizar o armazenamento de dados e obter informações de localização precisas.

## Integração com Supabase

Utilizamos o [Supabase](https://supabase.com/docs) para duas finalidades principais: armazenamento de arquivos no storage e persistência de dados utilizando o banco de dados Postgres fornecido pelo Supabase.

### Armazenamento de Arquivos

O Supabase oferece um serviço de armazenamento de arquivos eficiente e escalável. Isso nos permite salvar e recuperar arquivos de forma rápida e segura, garantindo a disponibilidade e integridade dos dados.

### Persistência de Dados com Postgres

Além do armazenamento de arquivos, utilizamos o banco de dados Postgres fornecido pelo Supabase para manter a integridade dos dados relacionais. Com ele, podemos armazenar informações detalhadas sobre pessoas e empresas de forma organizada e eficiente.

## Integração com Google Maps API

Para melhorar a precisão das informações de localização, integramos a aplicação com a [Google Maps API](https://developers.google.com/maps?hl=pt-br). Com base nos dados de endereço fornecidos, como rua, número, cidade, estado e código postal, obtemos as coordenadas de latitude e longitude do endereço. Isso nos permite exibir mapas precisos e facilitar a localização de empresas, tornando a experiência do usuário mais eficiente e intuitiva.

## Swagger

O projeto também possui uma documentação Swagger implementada. Você pode acessar a documentação em [http://localhost:3000/api/v1](http://localhost:3000/api/v1) após iniciar o aplicativo.

## Passos para Execução

1. **Clonar o Projeto:**

Abra um terminal e execute o seguinte comando para clonar o projeto:

```bash
git clone https://github.com/elvesbd/space-backend.git
cd space-backend
```

2. **Instalar Dependências:**

Abra um terminal e execute o seguinte comando para clonar o projeto:

```bash
npm install
cd space-backend
```

3. **Configurar o Banco de Dados com Docker:**

Abra um terminal e execute o seguinte comando para clonar o projeto:

```bash
docker run --name space-mongo -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=ebd123 -e MONGO_INITDB_DATABASE=space -p 27017:27017 -d mongo

cd space-backend
```

4. **Iniciar o servidor:**

Abra um terminal e execute o seguinte comando para clonar o projeto:

```bash
npm run start:dev
```

## 🤝 Colaborador

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://github.com/elvesbd.png" width="100px;" alt="Foto do Elves Brito no GitHub"/><br>
        <sub>
          <b>Elves Brito</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## Referência

Este projeto é parte de um desafio proposto pelo Grupo-AVP. Para mais informações sobre o desafio, consulte [link para o desafio](https://github.com/Grupo-AVP/agenda-dev).

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.

[⬆ Voltar ao topo](#AgendaDEV)<br>
