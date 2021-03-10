const jwt = require('jsonwebtoken')
const { JWTPrivateKey } = require('../config')
const JobSeeker = require('../models/jobseeker')
let auth = async(req, res, next) => {
    try {
        let token = req.header('Authorization').replace('Bearer', '').slice(1);
        let jobSeeker = await jwt.verify(token, JWTPrivateKey)
        jobSeeker = await JobSeeker.findOne({ _id: jobSeeker._id })
        if (!jobSeeker) { throw new error; }
        req.user = jobSeeker;
        next();
    } catch (err) {
        console.log(err)
        res.status(401).send({ 'error': "not authenticated" })
    }
}
module.exports = auth;