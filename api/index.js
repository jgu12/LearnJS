//using mongodb
import express from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import assert from 'assert';
import config from '../config';


let mdb;
MongoClient.connect(config.mongodbUri, (err, client) => {
  assert.strictEqual(null, err);
  mdb = client.db('test');
});

const router = express.Router();

router.get('/contests', (req, res) => {
  let contests = {};
  mdb.collection('contests').find({})
    .project({
      categoryName: 1,
      contestName: 1
    })
    .each((err, contest) => {

      assert.strictEqual(null, err);

      if (!contest) {
        //return when no more contest
        res.send({ contests }); //return an object by wrapping {}
        return;
      }

      contests[contest._id] = contest;
    });
});

router.get('/contests/:contestId', (req, res) => {
  mdb.collection('contests')
    .findOne({ _id: ObjectID(req.params.contestId) })
    .then(contest => {
      // console.log('RESP:', contest);
      res.send(contest);
    })
    .catch(console.error);
});


router.get('/names/:nameIds', (req, res) => {
  //req.params.nameIds.split(',').map(Number)  -> gives [101,102]
  const nameIds = req.params.nameIds.split(',').map(ObjectID);
  let names = {};
  setTimeout(function () {  //timeout to simulate slow api 
    mdb.collection('names').find({ _id: { $in: nameIds } })
      .each((err, name) => {

        assert.strictEqual(null, err);

        if (!name) {
          //return when no more contest
          res.send({ names }); //return an object by wrapping {}
          return;
        }

        names[name._id] = name;
      });
  }, 1000);
});

router.post('/names', (req, res) => {
  //req.body would be json object, use body-parser middleware to parse
  // res.send(req.body);
  // api structure: 
  // {
  // 	"newName": "a new name",
  // 	"contestId": "asdadsafdsaf"
  // }
  const contestId = ObjectID(req.body.contestId);
  const name = req.body.newName;
  //usually validate req ...
  //..
  console.log('incoming request', req.body);
  //return insert name
  mdb.collection('names').insertOne({name}).then(result => {
    mdb.collection('contests').findOneAndUpdate(
      {_id: contestId},
      { $push: { nameIds: result.insertedId} },
      { returnOriginal: false }  //this is node option, can return the new doc, so that in addName() setState, it updates the state and makes the contest component to refresh
      // { returnNewDocument: true }   //this is mongo shell option, still returns the old doc.
      //https://stackoverflow.com/questions/35626040/findoneandupdate-used-with-returnnewdocumenttrue-returns-the-original-document
    ).then(doc => 
      res.send({
        updatedContest: doc.value,      //response is not sending back the upadted doc, but the old doc. ReturnNewDocument not correct?
        newName: { _id: result.insertedId, name}
      }))
      .catch( error => {
        console.error(error);
        res.status(404).send('Bad Request');
      });
  });
  //update contest
  //
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


