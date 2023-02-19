const ApiError = require('../exception/ApiError');
const RatingService = require('./RateService')
const postDao = require('../dao/post.dao')
const userDao = require('../dao/user.dao')

class PostService {
    async create(title, content, userId) {
        const post = await postDao.create({title, content, userId});
        return this.getFullData(post);
    }

    async update(id, title, content) {
        const post = await postDao.findById(id);
        if ( !post )
            throw ApiError.BadRequest(400, `Post with id: ${id} is not exist`);

        await postDao.updatePost({title, content}, id)
        return this.getFullData(post);
    }

    async delete(id) {
        return await postDao.deleteById(id);
    }

    async getAll(page, limit) {
        page = page || 1
        limit = limit || 10
        const posts = await postDao.findAll(page, limit)
        return await Promise.all(posts.map(async (p) => await this.getFullData(p)));
    }

    async getById(id) {
        const post = await postDao.findById(id);
        if (!post) {
            throw ApiError.BadRequest(400, `Post with id: ${id} not found`)
        }

        return this.getFullData(post)
    }

    async setRate(id, rating) {
        const post = await postDao.findById(id);
        if (!post) {
            throw ApiError.BadRequest(400, `Post with id: ${id} not found`)
        }

        await RatingService.create(id, rating)

        return this.getFullData(post)
    }

    async getFullData(post) {
        const user = await userDao.findById(post.userId)
        const rating = await RatingService.calculatePostRating(post.id)

        return {
            id: post.id,
            title: post.title,
            content: post.content,
            rating: rating || 0,
            author: {
                id: user.id,
                email: user.email,
            }
        }
    }
}

module.exports = new PostService;