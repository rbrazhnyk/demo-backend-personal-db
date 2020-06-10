'use strict'

const graphql = require('graphql')
const User    = require('./user')

const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLSchema, GraphQLList } = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    }
  })
})

const GetUsersQuery = new GraphQLObjectType({
  name: 'GetUsersQuery',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({})
      }
    },
  }
})

const AddUserMutation = new GraphQLObjectType({
  name: 'AddUserMutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: {
          type: new GraphQLNonNull(GraphQLString)
        },
        lastName: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },

      resolve(parent, args) {
        const { firstName, lastName } = args

        return User.create({ firstName, lastName })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query:    GetUsersQuery,
  mutation: AddUserMutation
})
