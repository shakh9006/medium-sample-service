const {Rating} = require('../models');

const ratingDao = {
    create: create,
    findById: findById,
    findByPost: findByPost,
    deleteById: deleteById,
    updateRating: updateRating
}

function findByPost(postId) {
    return Rating.findAll({ where: {postId}});
}

function findById(id) {
    return Rating.findByPk(id);
}

function deleteById(id, postId) {
    return Rating.destroy({ where: { id: id, postId } });
}

function create(rating) {
    const newRating = new Rating(rating);
    return newRating.save();
}

function updateRating(rating, id) {
    const updateRating = {
        rating: rating.rating,
    };
    return Rating.update(updateRating, { where: { postId: id } });
}
module.exports = ratingDao;