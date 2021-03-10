const mongoose = require('mongoose');
let JobSeekerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})
let jobseeker = mongoose.model('Jobseeker', JobSeekerSchema)
module.exports = jobseeker;