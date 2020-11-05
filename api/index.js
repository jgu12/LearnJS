import express from 'express';
import data from '../src/testData';
// handle a group of routes in own module instead of in server.js
const router = express.Router();

router.get('/', (req, res) => {
  res.send({sampleResponseJson:[1,2,3]});
});

//make an object to represnt json on server load
const contests = data.contests.reduce((obj, contest) => {
  obj[contest.id] = contest;
  return obj;
}, {}); //what's the {} for?


router.get('/contests', (req, res) => {
  res.send({ 
    contests: contests
  });
});

router.get('/contests/:contestId', (req, res) => {
  //dynamic contestID, access by: req.params.contestId

  let contest = contests[req.params.contestId];
  //make up some fake content for now, put in a description field. 
  contest.description = 'Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, '; 
  res.send(contest);
});


export default router;
