const {Post} = require('../models');
const paginate = require('../utils/paginate')

const postDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updatePost: updatePost
}

function findAll(page, pageSize, filter = {}) {
    return Post.findAll(
        paginate(
            {
                where: filter
            },
            {page, pageSize}
        ),
    );
}

function findById(id) {
    return Post.findByPk(id);
}

function deleteById(id) {
    return Post.destroy({ where: { id: id } });
}

function create(post) {
    const newPost = new Post(post);
    return newPost.save();
}

function updatePost(post, id) {
    const updatePost = {
        title: post.title,
        content: post.content,
    };
    return Post.update(updatePost, { where: { id: id } });
}
module.exports = postDao;