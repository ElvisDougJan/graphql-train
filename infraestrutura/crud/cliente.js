const executaQuery = require('../database/queries')

class Cliente {
  async lista() {
    const sql = 'SELECT * FROM Clientes; SELECT * FROM Pets'

    return executaQuery(sql)
      .then(dados => {
        const clientes = dados[0]
        const pets = dados[1]

        return clientes.map(cliente => {
          const petsCliente = pets.filter(pet => pet.donoId === cliente.id)

          return ({
            ...cliente,
            pets: petsCliente
          })
        })
      })
  }

  async buscaPorId(id) {
    const sql = `SELECT * FROM Clientes WHERE id=${id}; SELECT * FROM Pets WHERE Pets.donoId = ${id}`

    return executaQuery(sql)
      .then(dados => {
        const cliente = dados[0][0]
        const pets = dados[1]

        return ({
          ...cliente,
          pets
        })
      })
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
