/**
 * Initial packages.
 */
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');

/**
 * Database Connection
 */
const db = require('./src/config/db');
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

/**
 * Define express app.
 */
const app = express();

/**
 * App rules.
 */
app.use(express.json())
app.use(cors());
app.use(cookieParser());

/**
 * Register routes.
 */
const checkAccessToken = require('./src/middlewares/checkAccessToken');
const authRoutes = require('./src/routes/auth/authRoutes');
const userRoutes = require('./src/routes/user/userRoutes');
const postRoutes = require('./src/routes/post/postRoutes');
app.use('/api/v1/', checkAccessToken, postRoutes);
app.use('/api/v1/', checkAccessToken, userRoutes);
app.use('/auth/', authRoutes);

/**
 * Register global error middleware.
 */
const routeMiddleware = require('./src/middlewares/routeMiddleware');
app.use(routeMiddleware);

const appStarter = async () => {
    try {
        db.sync().then(() => {
            app.listen(process.env.PORT, () => console.log('Server running at port:', process.env.PORT));
        }).catch(err => console.log("Error: " + err));
    } catch (e) {
        console.log('App starter error: ', e.message);
    }
}

appStarter()
    .catch(m => console.log(m.message))