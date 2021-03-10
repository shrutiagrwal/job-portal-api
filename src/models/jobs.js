const mongoose = require('mongoose');
const JobsSchema = new mongoose.Schema({
    recruiter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter' },
    name: { type: String, required: true }
})
const Jobs = mongoose.model('Jobs', JobsSchema);
module.exports = Jobs