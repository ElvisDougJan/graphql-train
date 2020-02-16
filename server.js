const { GraphQLServer } = require('graphql-yoga')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')
const Operacoes = require('./infraestrutura/operations')

conexao.connect(erro => {
  if (erro) {
    console.log(erro)
  }

  console.log('conectou no banco')

  Tabelas.init(conexao)
})

const Clientes = new Operacoes('cliente')

const resolvers = {
  Query: {
    listaClientes: () => Clientes.lista(),
    consultaClientePorId: (root, { id }) => Clientes.buscaPorId(id)
  },

  Mutation: {
    adicionarCliente: (root, params) => Clientes.adiciona(params),
    atualizarCliente: (root, params) => Clientes.atualiza(params),
    deletaClientePorId: (root, { id }) => Clientes.deleta(id)
  }
}

const servidor = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers
})

servidor.start(() => console.log('Servidor disponível!'))
