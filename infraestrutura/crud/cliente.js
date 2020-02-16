const executaQuery = require('../database/queries')

class Cliente {
  async lista() {
    const sql = 'SELECT * FROM Clientes'

    return executaQuery(sql)
  }

  async buscaPorId(id) {
    const sql = `SELECT * FROM Clientes WHERE id=${id}`

    return executaQuery(sql)
      .then(clientes => clientes[0])
      .catch(err => err)
  }

  async adiciona(item) {
    const { nome, cpf } = item
    const sql = `INSERT INTO Clientes(nome, CPF) VALUES('${nome}', '${cpf}')`

    return executaQuery(sql)
      .then(response => ({
        id: response.insertId,
        nome,
        cpf
      }))
      .catch(error => error)
  }

  async atualiza(novoItem) {
    const { id, nome, cpf } = novoItem
    const sql = `UPDATE Clientes SET nome='${nome}', CPF='${cpf}' WHERE id=${id}`

    return executaQuery(sql)
      .then(() => novoItem)
      .catch(err => err)
  }

  async deleta(id) {
    const sql = `DELETE FROM Clientes WHERE id=${id}`

    return executaQuery(sql)
      .then(() => 'Cliente deletado com sucesso!')
      .catch(err => err)
  }
}

module.exports = new Cliente
