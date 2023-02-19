class ApiError {
    status;
    message;

    constructor(status, message) {
        this.status = status;
        this.message = message;
    }

    static BadRequest(status = 400, message) {
        return new ApiError(status, message);
    }

    static InternalError(status = 500, message, ) {
        return new ApiError(status, message);
    }
}

module.exports = ApiError;