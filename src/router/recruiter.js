// const { response } = require('express');
const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken')
const { JWTPrivateKey } = require('../config');
const mongoose = require('mongoose');
const Recruiter = require('../models/recruiter')
const Job = require('../models/jobs')
const Applications = require('../models/applications')
const Jobseeker = require('../models/jobseeker')
const auth = require('../auth/RecruiterAuth');
const { ObjectId } = require('bson');

//signup
app.post('/new', async(req, res) => {
    try {
        let user = new Recruiter({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        let save = await user.save();
        res.send(save).status(200)
    } catch (err) {
        res.send({ 'error': 'error in providing details' }).status(400)
    }
})

//login
app.post('/login', async(req, res) => {
    try {
        let user = req.body;
        let password = user.password
        user = await Recruiter.findOne({ email: user.email });
        if (user.password !== password)
            return res.send('wrong password')
        let payload = { _id: user._id }
        let accesstoken = jwt.sign(payload, JWTPrivateKey)
        res.status(201).append('Authorization', `Bearer ${accesstoken}`).send(`Bearer ${accesstoken}`)
    } catch (err) {
        console.log(err)
        res.send({ 'error': "wrong credentials" }).status(401)
    }
})

//create job
app.post('/CreateJob', auth, async(req, res) => {
    try {
        let name = req.body.name;
        if (!name)
            return res.send({ "error": 'name not present' }).status(404)
        let job = new Job({
            recruiter_id: req.user._id,
            name
        })
        job = await job.save()
        res.send('success')

    } catch (err) {
        res.send({ 'error': 'server error' }).status(500)
    }
})

//view all candidates of job
app.get('/:id', auth, async(req, res) => {
    try {
        let jobId = req.params.id;
        let job = await Job.findById(jobId);
        let applications = await mongoose.model('Applications').aggregate(
            [
                { "$match": { job_id: ObjectId(jobId) } },
                {
                    "$lookup": {
                        from: "jobseekers",
                        localField: "jobseeker_id",
                        foreignField: "_id",
                        as: "name"
                    }
                }

            ]
        )
        res.send(applications)
    } catch (err) {
        console.log(err)
        res.send('error')
    }
})

//logout
app.post('/logout', auth, async(req, res) => {
    try {
        await req.user.remove();
        res.send(req.user)
    } catch (e) {
        res.status(500).send('error');
    }
});
module.exports = app;