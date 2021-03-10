const jwt = require('jsonwebtoken')
const { JWTPrivateKey } = require('../config')
const Recruiter = require('../models/recruiter')
let auth = async(req, res, next) => {
    try {
        let token = req.header('Authorization').replace('Bearer', '').slice(1);
        let recruiter = await jwt.verify(token, JWTPrivateKey)
        recruiter = await Recruiter.findOne({ _id: recruiter._id })
        if (!recruiter) { throw new error; }
        req.user = recruiter;
        next();
    } catch (err) {
        console.log(err)
        res.status(401).send({ 'error': "not authenticated" })
    }
}
module.exports = auth;