const {Token} = require('../models');

const tokenDao = {
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateToken: updateToken,
    findOne: findOne
}

function findAll() {
    return Token.findAll();
}

function findOne(filter) {
    return Token.findOne({ where: filter });
}

function findById(id) {
    return Token.findByPk(id);
}

function deleteById(id) {
    return Token.destroy({ where: { id: id } });
}

function create(token) {
    const newToken = new Token(token);
    return newToken.save();
}

function updateToken(token, id) {
    const updateToken = {
        refreshToken: token.refreshToken,
    };
    return Token.update(updateToken, { where: { userId: id } });
}

module.exports = tokenDao;