const express = require('express');
const clientModel = require('../models/client-model');
const userModel = require('../models/user-model');
const jobModel = require('../models/job-model');
const router = express.Router();


router.get('/:id', async (req, res) => {
  try {
    const freelancer = await freelancerModel.findOne({ _id: req.params.id });
    if (!freelancer) {
      return res.status(404).json({ message: 'Freelancer not found' });
    }
    const user = await userModel.findOne({ _id: freelancer.userid });
    res.json({ freelancer, user });

  } catch (error) {
    // res.status(500).json({ message: error.message });
    res.send(error.message);
  }
});



// http://localhost:3000/client/create/job/
router.post('/create/job/:id', async (req, res) => {
  try {
    let { title, discription, budget, skills, timeline } = req.body;
    const client = await clientModel.findOne({ _id: req.params.id });
    if (!client) {
      return res.status(401).json({ message: "Client is not found" });
    }
    const job = await jobModel.create({
      title,
      discription,
      budget,
      skills,
      timeline,
      clientId: req.params.id,
    })
    client.jobId.push(job._id);
    await client.save();
    res.json({ job });
  } catch (error) {
    res.json(error.message);
  }
})

router.get('/jobs/:id', async (req, res) => {
  try {
    const client = await clientModel.findOne({ _id: req.params.id });

    if (!client) {
      return res.status(404).json("Client not available");
    }

    const jobs = await Promise.all(
      client.jobId.map(jobId => jobModel.findById(jobId))
    );

    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/job/:id', async(req, res)=>{
  try {
    let job = await jobModel.findOne({_id: req.params.id});
    let client = await clientModel.findOne({_id: job.clientId});
    let user = await userModel.findOne({_id: client.userId});
    
    res.status(200).json({job, client:{
      name: user.firstName + ' ' + user.lastName,
      email: user.email,
      jobPosted : client.jobId.length
    }})
  } catch (error) {
    res.json(error.message)
    console.log(error.message)
  }
})


module.exports = router;