const Operacoes = require('../../infraestrutura/operations')
const Atendimentos = new Operacoes('atendimento')

const resolvers = {
  Query: {
    listaAtendimentos: () => Atendimentos.lista(),
    consultaAtendimentoPorId: (root, { id }) => Atendimentos.buscaPorId(id)
  },

  Mutation: {
    adicionarAtendimento: (root, params) => Atendimentos.adiciona(params),
    atualizarAtendimento: (root, params) => Atendimentos.atualiza(params),
    deletaAtendimentoPorId: (root, { id }) => Atendimentos.deleta(id)
  }
}

module.exports = resolvers