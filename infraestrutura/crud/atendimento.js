const executaQuery = require('../database/queries')

class Atendimento {
  async lista() {
    const sql = `
    SELECT Atendimentos.id, Atendimentos.data, Atendimentos.status, Atendimentos.observacoes,
    Pets.id as petId, Pets.nome as petNome, Pets.tipo as petTipo, Pets.observacoes as petObservacoes,
    Clientes.id as clienteId, Clientes.nome as clienteNome, Clientes.cpf as clienteCPF,
    Servicos.id as servicoId, Servicos.nome as servicoNome, Servicos.preco as servicoPreco, Servicos.descricao as servicoDescricao
    FROM Atendimentos
    INNER JOIN Clientes
    INNER JOIN Pets
    INNER JOIN Servicos
    WHERE
    Atendimentos.clienteId = Clientes.id
    AND Atendimentos.petId = Pets.id
    AND Atendimentos.servicoId = Servicos.id`

    return executaQuery(sql)
      .then(atendimento => {
        return atendimento.map(atendimento => ({
          id: atendimento.id,
          data: atendimento.data,
          status: atendimento.status,
          observacoes: atendimento.observacoes,
          cliente: {
            id: atendimento.clienteId,
            nome: atendimento.clienteNome,
            cpf: atendimento.clienteCPF
          },
          pet: {
            id: atendimento.petId,
            nome: atendimento.petNome,
            tipo: atendimento.petTipo,
            observacoes: atendimento.observacoes
          },
          servico: {
            id: atendimento.servicoId,
            nome: atendimento.servicoNome,
            preco: atendimento.servicoPreco,
            descricao: atendimento.servicoDescricao
          }
        }))
      })
  }

  async buscaPorId(id) {
    const sql = `
    SELECT Atendimentos.id, Atendimentos.data, Atendimentos.status, Atendimentos.observacoes,
    Pets.id as petId, Pets.nome as petNome, Pets.tipo as petTipo, Pets.observacoes as petObservacoes,
    Clientes.id as clienteId, Clientes.nome as clienteNome, Clientes.cpf as clienteCPF,
    Servicos.id as servicoId, Servicos.nome as servicoNome, Servicos.preco as servicoPreco, Servicos.descricao as servicoDescricao
    FROM Atendimentos
    INNER JOIN Clientes
    INNER JOIN Pets
    INNER JOIN Servicos
    WHERE
    Atendimentos.clienteId = Clientes.id
    AND Atendimentos.petId = Pets.id
    AND Atendimentos.servicoId = Servicos.id
    AND Atendimentos.id = ${id}`

    return executaQuery(sql)
      .then(atendimento => ({
        id: atendimento[0].id,
        data: atendimento[0].data,
        status: atendimento[0].status,
        observacoes: atendimento[0].observacoes,
        cliente: {
          id: atendimento[0].clienteId,
          nome: atendimento[0].clienteNome,
          cpf: atendimento[0].clienteCPF
        },
        pet: {
          id: atendimento[0].petId,
          nome: atendimento[0].petNome,
          tipo: atendimento[0].petTipo,
          observacoes: atendimento[0].observacoes
        },
        servico: {
          id: atendimento[0].servicoId,
          nome: atendimento[0].servicoNome,
          preco: atendimento[0].servicoPreco,
          descricao: atendimento[0].servicoDescricao
        }
      }))
  }

  async adiciona(item) {
    const { clienteId, petId, servicoId, status, observacoes } = item
    const data = new Date().toLocaleDateString()

    const sql = `INSERT INTO Atendimentos(clienteId, petId, servicoId, data, status, observacoes) VALUES(${clienteId}, ${petId}, ${servicoId}, '${data}', '${status}', '${observacoes}');
    SELECT * FROM Clientes WHERE Clientes.id = ${clienteId}; SELECT * FROM Pets WHERE Pets.id = ${petId}; SELECT * FROM Servicos WHERE Servicos.id = ${servicoId}`

    return executaQuery(sql)
      .then(resposta => {
        const dados = resposta[0]
        const cliente = resposta[1][0]
        const pet = resposta[2][0]
        const servico = resposta[3][0]

        return ({
          id: dados.insertId,
          cliente,
          data,
          pet,
          servico,
          status,
          observacoes
        })
      })
  }

  async atualiza(novoItem) {
    const { id, clienteId, petId, servicoId, status, observacoes } = novoItem
    const data = new Date().toLocaleDateString()

    const sql = `
    UPDATE Atendimentos SET
    clienteId=${clienteId}, petId=${petId}, servicoId=${servicoId}, data='${data}', status='${status}', observacoes='${observacoes}' WHERE id=${id};
    SELECT * FROM Clientes WHERE Clientes.id = ${clienteId};
    SELECT * FROM Pets WHERE Pets.id = ${petId};
    SELECT * FROM Servicos WHERE Servicos.id = ${servicoId};`

    return executaQuery(sql)
      .then(resposta => {
        const cliente = resposta[1][0]
        const pet = resposta[2][0]
        const servico = resposta[3][0]

        return ({
          ...novoItem,
          data,
          cliente,
          pet,
          servico
        })
      })
  }

  async deleta(id) {
    const sql = `DELETE FROM Atendimentos WHERE id=${id}`

    return executaQuery(sql)
      .then(() => 'Atendimento deletado com sucesso!')
  }
}

module.exports = new Atendimento
