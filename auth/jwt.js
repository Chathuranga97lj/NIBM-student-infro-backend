const { expressjwt:expressJwt } = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;

    return expressJwt({
        secret,
        algorithms: ['HS256'],
    }).unless({
        path: [
            `${api}/user/login`,
            `${api}/user/register`,
            `${api}/student/add`,
            `${api}/student/get`,
            `${api}/student/update/:id`,
            `${api}/student/delete/:id`,
        ]
    });
}

module.exports = authJwt;