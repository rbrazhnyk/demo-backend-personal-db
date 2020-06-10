'use strict'

const mongoose        = require('mongoose')
const express         = require('express')
const express_graphql = require('express-graphql')
const { buildSchema } = require('graphql')

const schema  = require('./schema')

const PORT    = 4000
const DB_URI  = 'mongodb://localhost:27017'
const DB_NAME = 'demo-personal-db'

mongoose.connect(`${DB_URI}/${DB_NAME}`, { useNewUrlParser: true })

mongoose.connection.once('open', () => console.log('connected to database'))

const app = express()

app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(PORT, () => {
  console.log(`Express GraphQL Server Now Running On 'localhost:${PORT}/graphql'`)
})
