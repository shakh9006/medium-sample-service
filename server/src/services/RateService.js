const ApiError = require('../exception/ApiError');
const ratingDao = require('../dao/rating.dao')

class RatingService {
    async create(postId, rating) {
        const r = await ratingDao.create({postId, rating});
        if ( !r )
            throw ApiError.BadRequest(500, `Could not create rating`);
    }

    async update(id, rating) {
        const r = await ratingDao.findById(id);
        if ( !r )
            throw ApiError.BadRequest(400, `Rating with id: ${id} not found`);

        await ratingDao.updateRating({rating}, id)
    }

    async calculatePostRating(postId) {
        const ratings = await ratingDao.findByPost(postId) || [];
        const rateData = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0}
        return this.ratingFormula(ratings, rateData) || 0
    }

    async calculateUserRating(posts) {
        const ratingData = {}
        const ratings = posts.map(p => {
            return {rating: p.rating}
        })

        posts.forEach(p => {
            if ( p.rating > 0 ) {
                if (typeof ratingData[p.rating] === "undefined") {
                    ratingData[p.rating] = 0
                } else {
                    ratingData[p.rating]++
                }
            }
        })
        return this.ratingFormula(ratings, ratingData) || 0
    }

    async delete(id) {
        return await ratingDao.deleteById(id);
    }

    ratingFormula(ratings, rateData) {
        let sum = 0
        let multiple = 0
        ratings.forEach(r => rateData[r.rating]++)
        Object.keys(rateData).forEach(k => multiple += rateData[k] * k )
        Object.values(rateData).forEach(v => sum += v)
        return +Number.parseFloat(multiple / sum).toFixed(1)
    }
}

module.exports = new RatingService;