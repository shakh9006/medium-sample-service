const PostService = require('../services/PostService');

class PostController {
    async create(req, res, next) {
        try {
            const {title, content} = req.body;
            const {id} = req.user;
            const data = await PostService.create(title, content, id);
            res.send(data);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const {id, title, content} = req.body;
            const data = await PostService.update(id, title, content);
            res.status(200).send({message: 'Post updated successfully', data});
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const data = await PostService.delete(id);
            res.status(200).send({message: 'Post deleted successfully', data});
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        let {page, limit} = req.query;
        try {
            const data = await PostService.getAll(page, limit);
            res.status(200).send({message: 'success', data});
        } catch (e) {
            next(e);
        }
    }

    async getPost(req, res, next) {
        const {id} = req.params;
        try {
            const data = await PostService.getById(id);
            res.status(200).send({message: 'success', data});
        } catch (e) {
            next(e);
        }
    }

    async rating(req, res, next) {
        const {rating, id} = req.body;
        try {
            const data = await PostService.setRate(id, rating);
            res.status(200).send({message: 'success', data});
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new PostController;