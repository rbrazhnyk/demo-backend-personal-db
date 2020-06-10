'use strict'

const express         = require('express')
const express_graphql = require('express-graphql')
const { buildSchema } = require('graphql')

const PORT   = 4000
const schema = buildSchema(`
  type Query {
    users: [User]
  },
  type Mutation {
    addUser(firstName: String!, lastName: String!): User
  }
  type User {
    id: Int
    firstName: String
    lastName: String
  }
`)

const users = [
  {
    firstName: 'Roman',
    lastName:  'Brazhnyk'
  }
]

const getUsers = function() {
  return users
}

const addUser = function({ firstName, lastName }) {
  users.push({ firstName, lastName })
}

const root = {
  users:   getUsers,
  courses: getCourses,
  addUser: addUser
}

const app = express()

app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(PORT, () => {
  console.log(`Express GraphQL Server Now Running On 'localhost:${PORT}/graphql'`)
})
