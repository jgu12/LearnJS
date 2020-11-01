import express from 'express';
import data from '../src/testData';
// handle a group of routes in own module instead of in server.js
const router = express.Router();

router.get('/', (req, res) => {
  res.send({sampleResponseJson:[1,2,3]});
});

router.get('/contests', (req, res) => {
  res.send({ contests: data.contests });
});


export default router;