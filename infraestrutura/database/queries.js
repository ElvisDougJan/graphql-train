const conexao = require('../conexao')

const executaQuery = (query) => {
  return new Promise((resolve, reject) => {
    conexao.query(query, (erro, resultados, campos) => {
      console.log('Executou a query!')
      if (erro) reject(erro)
      resolve(resultados)
    })
  })
}

module.exports = executaQuery
