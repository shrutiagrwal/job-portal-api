const express = require('express');
const mongoDB = require('./db/mongoose')
const app = express();
app.use(express.json());
const jobseeker = require('./router/jobseeker')
const recruiter = require('./router/recruiter')

app.use('/api/recruiter', recruiter)
app.use('/api/jobseeker', jobseeker)
    //mongoDB connection------------------
mongoDB();

//server start------------------------
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is started on port ${port}`)
})