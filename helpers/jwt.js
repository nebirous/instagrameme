const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.SECRET;
    return expressJwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path: [
        `/users/login`,
        `/users/register`,
        ],
    });
}

module.exports = authJwt;

