const jwt = require('jsonwebtoken');
const _ = require("lodash");

function verifyJWTToken(token, role) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err)
            }
            resolve(decodedToken)
        })
    })
}


function createJWToken(details, maxAge) {
    if (typeof details !== 'object') {
        details = {}
    }

    if (!maxAge || typeof maxAge !== 'number') {
        maxAge = 3600
    }

    let token = jwt.sign(details,
        process.env.JWT_SECRET,
        {
            expiresIn: maxAge,
            algorithm: 'HS256'
        })

    return token
}

module.exports = {
    verifyJWTToken,
    createJWToken
}