const { application } = require('express');
const mongoose = require('mongoose');
const ApplicationsSchema = new mongoose.Schema({
    job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' },
    jobseeker_id: { type: mongoose.Schema.Types.ObjectId, ref: 'JobSeeker' }
})

let applications = mongoose.model('Applications', ApplicationsSchema)
module.exports = applications