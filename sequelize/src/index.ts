import { Sequelize } from 'sequelize'
// import db from '../models'

// Option 1: Passing a connection URI
const sequelize = new Sequelize('postgres://user:password@localhost:5432/db_sequelize')

console.log('sequelize', sequelize)
