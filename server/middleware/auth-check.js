const jwt = require('jsonwebtoken');
const db = require('../models/');
const config = require('../../config/index.json');


/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }
    
    // get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization.split(' ')[1];

    // decode the token using a secret key-phrase
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        // the 401 code is for unauthorized status
        if (err) { return res.status(401).end(); }

        const userId = decoded.sub;

        // check if a user exists
        return db.Client.findOne({
            where: { uuid: req.body.uuid },
        }), (userErr, data) => {
            if (userErr || !user) {
                return res.status(401).end();
            }
                return next();
        };
        // (userId, (userErr, user) => {
        //   if (userErr || !user) {
        //     return res.status(401).end();
        //   }

        //   return next();
    });

};