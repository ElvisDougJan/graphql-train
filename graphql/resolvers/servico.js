const Operacoes = require('../../infraestrutura/operations')
const Servicos = new Operacoes('servico')

const resolvers = {
  Query: {
    consultaTodosServicos: () => Servicos.lista(),
    consultaServicoPorId: (root, { id }) => Servicos.buscaPorId(id)
  },

  Mutation: {
    adicionarServico: (root, params) => Servicos.adiciona(params),
    atualizarServicoPorId: (root, params) => Servicos.atualiza(params),
    deletaServicoPorId: (root, { id }) => Servicos.deleta(id)
  }
}

module.exports = resolvers