const mongoose = require('mongoose');
let RecruiterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})
let recruiter = mongoose.model('recruiter', RecruiterSchema)
module.exports = recruiter;