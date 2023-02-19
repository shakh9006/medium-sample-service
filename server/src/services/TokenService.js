const jwt = require('jsonwebtoken');
const tokenDao = require('../dao/token.dao')

class TokenService {
    async generateTokens(data) {
        const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = process.env;
        const accessToken = jwt.sign(data, JWT_ACCESS_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign(data, JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        };
    }

    async create(userId, refreshToken) {
        const token = await this.findOne({userId});
        if ( token ) {
            token.refreshToken = refreshToken;
            return await token.save();
        }

        const newToken = await tokenDao.create({userId, refreshToken});
        return await newToken.save();
    }

    async deleteOne(id) {
        return await tokenDao.deleteById(id);
    }

    async findOne(filter = {}) {
        return await tokenDao.findOne(filter);
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (e) {
            return null;
        }
    }
}

module.exports = new TokenService;