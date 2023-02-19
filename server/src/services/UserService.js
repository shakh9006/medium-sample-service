const bcrypt = require('bcrypt');
const ApiError = require('../exception/ApiError');
const UserDto = require('../dto/user.dto');
const TokenService = require('../services/TokenService');
const RatingService = require('../services/RateService');
const userDao = require('../dao/user.dao')
const postDao = require('../dao/post.dao')
const userValidate = require('../validation/userValidate')

class UserService {
    async register(email, password) {
        const { error } = userValidate({email, password});
        if (error)
            throw ApiError.BadRequest(400, error.details[0].message)

        const candidate = await userDao.findOne({email});
        if (candidate)
            throw ApiError.BadRequest(400, `User with email: ${email} already exist`);

        const hashedPassword = await bcrypt.hash(password, 3);
        const user = await userDao.create({email, password: hashedPassword});
        await user.save();
        return await this.generateTokens(user);
    }

    async login(email, password) {
        const user = await userDao.findOne({email});
        if (!user)
            throw ApiError.BadRequest(400, `Wrong email or password`);

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck)
            throw ApiError.BadRequest(400, `Wrong email or password`);

        return await this.generateTokens(user);
    }

    async logout(refreshToken) {
        return await TokenService.deleteOne(refreshToken);
    }

    async refresh(refreshToken) {
        const token = await TokenService.findOne({refreshToken});
        const userData = TokenService.validateRefreshToken(refreshToken);

        if (!refreshToken || !token || !userData)
            throw ApiError.BadRequest(401, 'Permission denied');

        const user = await userDao.findOne({email: userData.email});
        return await this.generateTokens(user);
    }

    async generateTokens(data) {
        const user = new UserDto(data);
        const tokens = await TokenService.generateTokens({...user});
        await TokenService.create(user.id, tokens.refreshToken);
        return {
            ...user,
            ...tokens,
        }
    }

    async getAll(page, limit) {
        page = page || 1
        limit = limit || 10
        const users = await userDao.findAll(page, limit)
        return await Promise.all(users.map(async (u) => this.getFullData(u)));
    }

    async getById(id) {
        const user = await userDao.findById(id);
        if (!user) {
            throw ApiError.BadRequest(400, `User with id: ${id} not found`)
        }

        return await this.getFullData(user)
    }

    async getFullData(user) {
        const posts = await postDao.findAll(1, 100, {userId: user.id})
        const newPosts = await Promise.all(posts.map(async (p) => {
            if (p.dataValues) {
                p = p.dataValues
            }

            p.rating = await RatingService.calculatePostRating(p.id) || 0
            delete p.userId
            return p
        }))

        const rating = await RatingService.calculateUserRating(newPosts)

        return {
            id: user.id,
            email: user.email,
            rating: rating,
            posts: newPosts,
        }
    }


}


module.exports = new UserService();