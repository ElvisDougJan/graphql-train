const Operacoes = require('../../infraestrutura/operations')
const Pets = new Operacoes('pet')

const resolvers = {
  Query: {
    listaPets: () => Pets.lista(),
    consultaPetPorId: (root, { id }) => Pets.buscaPorId(id)
  },

  Mutation: {
    adicionarPet: (root, params) => Pets.adiciona(params),
    atualizarPet: (root, params) => Pets.atualiza(params),
    deletaPetPorId: (root, { id }) => Pets.deleta(id)
  }
}

module.exports = resolvers