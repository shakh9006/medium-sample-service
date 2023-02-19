const {User} = require('../models');
const paginate = require("../utils/paginate");

const userDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    findOne: findOne,
}

function findAll(page, pageSize) {
    return User.findAll(
        paginate(
            {
                where: {}
            },
            {page, pageSize}
        ),
    );
}

function findOne(filter = {}) {
    return User.findOne({ where: filter});
}

function findById(id) {
    return User.findByPk(id);
}

function deleteById(id) {
    return User.destroy({ where: { id: id } });
}

function create(user) {
    const newUser = new User(user);
    return newUser.save();
}

function updateUser(user, id) {
    const updateUser = {
        email: user.email,
        password: user.password,
    };
    return User.update(updateUser, { where: { id: id } });
}
module.exports = userDao;