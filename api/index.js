import express from 'express';

// handle a group of routes in own module instead of in server.js
const router = express.Router();

router.get('/', (req, res) => {
    res.send({sampleResponseJson:[1,2,3]});
});

export default router;