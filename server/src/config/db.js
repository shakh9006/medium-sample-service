const Sequelize = require('sequelize')
const {DB_DATABASE, DB_PASSWORD, DB_USERNAME, DB_DIALECT} = process.env

const db = new Sequelize(
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD, {
        host: 'localhost',
        dialect: DB_DIALECT
    }
)

module.exports = db