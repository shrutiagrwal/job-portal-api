// const { response } = require('express');
const express = require('express');
const JobSeeker = require('../models/jobseeker')
const Jobs = require('../models/jobs')
const Applications = require('../models/applications')
const app = express.Router();
const jwt = require('jsonwebtoken')
const auth = require('../auth/JobSeekerAuth')
const { JWTPrivateKey } = require('../config');
const mongoose = require('mongoose');

//signup
app.post('/new', async(req, res) => {
    try {
        let user = new JobSeeker({
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
        user = await JobSeeker.findOne({ email: user.email });
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

//apply to a job
app.get('/:id/apply', auth, async(req, res) => {
    try {
        let job_id = req.params.id;
        let jobseeker_id = req.user._id;
        let seekers = await Applications.find({ jobseeker_id, job_id })
        if (seekers.length !== 0)
            return res.send('already applied')
        let user = new Applications({ job_id, jobseeker_id });
        user = await user.save();
        return res.send(user).status(200)
    } catch (err) {
        res.send('error')
    }
})

// view all jobs
app.get('/AvailableJobs', auth, async(req, res) => {
    try {
        let jobs = await Jobs.find();
        res.send(jobs).status(200)
    } catch (err) {
        res.send('error')
    }
})

//logout
app.post('/logout', auth, async(req, res) => {
    try {
        await req.user.remove();
        res.send(req.user)
    } catch (e) {
        res.status(500).send();
    }
});
module.exports = app;