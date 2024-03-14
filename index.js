const express = require('express')
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const User = require('./models/user');
const Job = require('./models/job')
const ApplicantJob  = require('./models/applicant')
const MONGO_URI = '<MONGO_URI>';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
const app = express()
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

const port = 3000

app.get('/', (req, res) => {
  res.send('Application working fine...........')
})

app.post('/user', async (req, res) => {
    const { name, email, phone } = req.body;

  try {
    const user = new User({ name, email, phone });
    await user.save();
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.post('/addJob', async (req, res) => {
    const { title, desc, location, archived, active, userId } = req.body;

  try {
    const todayDate = new Date().getDate()
    const job = new Job({ title: title, desc: desc, location: location, archived: archived, active: active, createdAt: todayDate, userId: userId });
    await job.save();
    res.send(job);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.post('/editJobInterest', async (req, res) => {
    const {userId, interested, JobId} = req.body
    try {
    const applicantJob = new ApplicantJob({ userId, interested, JobId });
    await applicantJob.save();
    res.send(applicantJob);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
})


//teraformers should be able to find job marked intrested by users, return user details here
app.get('/intrestedUsers/:id', async (req, res) => {
    ObjectId = mongoose.Schema.ObjectId 
    const {id} = req.params
    const jobId = new mongoose.Types.ObjectId(id)
    console.log(jobId)
    try {
    const job = Job.findById(jobId)
    console.log(job)
    // const intrestedApplicants = ApplicantJob.find({jobId})
    console.log(title)
    res.send(title);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
})


app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})