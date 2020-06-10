'use strict'

const mongo  = require('mongoose')
const Schema = mongo.Schema

const userSchema = new Schema({
  firstName: String,
  lastName:  String
})

module.exports = mongo.model('User', userSchema)
