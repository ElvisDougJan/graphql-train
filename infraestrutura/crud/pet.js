const executaQuery = require('../database/queries')

class Pet {
  async lista() {
    const sql = 'SELECT Pets.id, Pets.nome, Pets.tipo, Pets.observacoes, Clientes.id as donoId, Clientes.nome as donoNome, Clientes.cpf as donoCPF FROM Pets INNER JOIN Clientes WHERE Pets.donoId = Clientes.id'

    return executaQuery(sql)
      .then(pets => pets.map(pet => ({
        id: pet.id,
        nome: pet.nome,
        tipo: pet.tipo,
        observacoes: pet.observacoes,
        dono: {
          id: pet.donoId,
          nome: pet.donoNome,
          cpf: pet.donoCPF
        }
      })))
  }

  async buscaPorId(id) {
    const sql = `SELECT Pets.id, Pets.nome, Pets.tipo, Pets.observacoes, Clientes.id as donoId, Clientes.nome as donoNome, Clientes.cpf as donoCPF FROM Pets INNER JOIN Clientes WHERE Pets.id=${parseInt(id)} AND Clientes.id = Pets.donoId`

    return executaQuery(sql)
      .then(pet => ({
        id: pet[0].id,
        nome: pet[0].nome,
        tipo: pet[0].tipo,
        observacoes: pet[0].observacoes,
        dono: {
          id: pet[0].donoId,
          nome: pet[0].donoNome,
          cpf: pet[0].donoCPF
        }
      }))
  }

  async adiciona(item) {
    const { nome, donoId, tipo, observacoes } = item

    const sql = `INSERT INTO Pets(nome, donoId, tipo, observacoes) VALUES('${nome}', ${donoId}, '${tipo}', '${observacoes}')`

    return executaQuery(sql)
      .then(petCreated => ({
        ...item,
        id: petCreated.insertId
      }))
  }

  async atualiza(novoItem) {
    const { id, nome, donoId, tipo, observacoes } = novoItem

    const sql = `UPDATE Pets SET nome='${nome}', donoId=${donoId}, tipo='${tipo}', observacoes='${observacoes}' WHERE id=${id}`

    return executaQuery(sql)
      .then(() => 'Pet atualizado com sucesso!')
  }

  async deleta(id) {
    const sql = `DELETE FROM Pets WHERE id=${id}`

    return executaQuery(sql)
      .then(() => 'Pet deletado com sucesso!')
  }
}

module.exports = new Pet
