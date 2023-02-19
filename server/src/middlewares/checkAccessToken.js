const ApiError = require('../exception/ApiError');
const TokenService = require('../services/TokenService');

module.exports = function (req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if ( !authorizationHeader )
        return next(ApiError.BadRequest(401, 'Permission denied'))

    const accessToken = authorizationHeader.split(' ')[1];
    if ( !accessToken )
        return next(ApiError.BadRequest(401, 'Permission denied'))

    const validationData = TokenService.validateAccessToken(accessToken);
    if ( !validationData )
        return next(ApiError.BadRequest(401, 'Permission denied'))

    req.user = validationData;
    next();
}
