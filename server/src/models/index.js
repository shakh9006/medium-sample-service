const {DataTypes} = require('sequelize')
const db = require('../config/db')


const User = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {notEmpty: true}
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {notEmpty: true}
    }
}, {
    timestamps: false
})

const Post = db.define('post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
    }
}, {
    timestamps: false
})

const Token = db.define('token', {
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
    },
}, {
    timestamps: false
})

const Rating = db.define('rating', {
    rating: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate: { notEmpty: true, min: 1, max: 5 }
    },
}, {
    timestamps: false
})

User.hasMany(Post)
User.hasOne(Token)
Post.hasMany(Rating)
Post.belongsTo(User)
Token.belongsTo(User)
Rating.belongsTo(Post)

module.exports.User = User
module.exports.Post = Post
module.exports.Token = Token
module.exports.Rating = Rating