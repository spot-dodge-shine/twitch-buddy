const Sequelize = require('sequelize')
const db = require('../db')

const Votechoice = db.define('votechoice', {})

module.exports.Votechoice = Votechoice