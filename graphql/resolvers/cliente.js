const Operacoes = require('../../infraestrutura/operations')
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

module.exports = resolvers