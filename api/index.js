//using mongodb
import express from 'express';
import {MongoClient} from 'mongodb';
import assert from 'assert';
import config from '../config';


let mdb;
MongoClient.connect(config.mongodbUri, (err, client) => {
  assert.strictEqual(null, err);
  mdb=client.db('test');
});

const router = express.Router();

router.get('/contests', (req, res) => {
  let contests = {};
  mdb.collection('contests').find({})
    .project({
      id: 1,
      categoryName: 1,
      contestName: 1
    })
    .each((err, contest) => {

      assert.strictEqual(null, err);

      if(!contest) {
        //return when no more contest
        res.send({contests}); //return an object by wrapping {}
        return;
      }

      contests[contest.id] = contest;
    });
});

router.get('/contests/:contestId', (req, res) => {
  mdb.collection('contests')
    .findOne({id: Number(req.params.contestId)})
    .then(contest => {
      // console.log('RESP:', contest);
      res.send(contest);
    })
    .catch(console.error);
});


router.get('/names/:nameIds', (req, res) => {
  //req.params.nameIds.split(',').map(Number)  -> gives [101,102]
  const nameIds = req.params.nameIds.split(',').map(Number);
  let names = {};
  mdb.collection('names').find({ id: {$in: nameIds}})
    .each((err, name) => {

      assert.strictEqual(null, err);

      if(!name) {
        //return when no more contest
        res.send({names}); //return an object by wrapping {}
        return;
      }

      names[name.id] = name;
    });
});



export default router;





//<<<<<<<<<<<<Using local test data>>>>>>>>>
// import express from 'express';
// import data from '../src/testData';
// // handle a group of routes in own module instead of in server.js
// const router = express.Router();

// router.get('/', (req, res) => {
//   res.send({sampleResponseJson:[1,2,3]});
// });

// //make an object to represnt json on server load
// const contests = data.contests.reduce((obj, contest) => {
//   obj[contest.id] = contest;
//   return obj;
// }, {}); //what's the {} for?


// router.get('/contests', (req, res) => {
//   res.send({ 
//     contests: contests
//   });
// });

// router.get('/contests/:contestId', (req, res) => {
//   //dynamic contestID, access by: req.params.contestId

//   let contest = contests[req.params.contestId];
//   //make up some fake content for now, put in a description field. 
//   contest.description = 'Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, Fake content, '; 
//   res.send(contest);
// });


// export default router;


