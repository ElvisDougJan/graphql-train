const { GraphQLServer } = require('graphql-yoga')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')

conexao.connect(erro => {
  if (erro) {
    console.log(erro)
  }

  console.log('Conectou no banco')

  Tabelas.init(conexao)
})

const servidor = new GraphQLServer({
  typeDefs: require('./graphql/schemas'),
  resolvers: require('./graphql/resolvers')
})

servidor.start(() => console.log('Servidor disponível!'))
