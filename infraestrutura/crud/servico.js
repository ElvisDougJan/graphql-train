const executaQuery = require('../database/queries')

class Servico {
  async lista() {
    const sql = 'SELECT * FROM Servicos'

    return executaQuery(sql)
  }

  async buscaPorId(id) {
    const sql = `SELECT * FROM Servicos WHERE id=${parseInt(id)}`

    return executaQuery(sql)
      .then(servico => servico[0])
  }

  async adiciona(item) {
    const { nome, preco, descricao } = item
    const sql = `INSERT INTO Servicos(nome, Preco, Descricao) VALUES('${nome}', ${preco}, '${descricao}')`

    return executaQuery(sql)
      .then(servicoCriado => ({
        id: servicoCriado.insertId,
        ...item
      }))
  }

  async atualiza(novoItem) {
    const { id, nome, preco, descricao } = novoItem
    const sql = `UPDATE Servicos SET nome='${nome}', Preco=${preco}, Descricao='${descricao}' WHERE id=${id}`

    return executaQuery(sql)
      .then(() => novoItem)
  }

  async deleta(id) {
    const sql = `DELETE FROM Servicos WHERE id=${id}`

    return executaQuery(sql)
      .then(() => 'Servico deletado com sucesso!')
  }
}

module.exports = new Servico
