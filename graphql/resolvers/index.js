const path = require('path')
const mergeGraphQLSchemas = require('merge-graphql-schemas')

const arquivos = path.join(__dirname, './')
const { fileLoader, mergeResolvers } = mergeGraphQLSchemas

const arquivosCarregados = fileLoader(arquivos)
const resolvers = mergeResolvers(arquivosCarregados)

module.exports = resolvers