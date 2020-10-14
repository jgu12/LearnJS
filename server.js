// look for config.js at same level, '../' for going up a level 
import config, {nodeEnv, logLines, sayHi} from './config';

//>>>>>> node https way
// import https from 'https';
// https.get('https://www.lynda.com', res=>{
//     console.log("response status code: ", res.statusCode)
// });


//>>>> node http way
// import http from 'http';
// const server = http.createServer();
// server.listen(8080);

// server.on('request', (req, res) => {
//     res.write('Hello!\n');

//     setTimeout(()=>{
//         res.write('a few seconds later\n');
//         res.end();
//     }, 3000);
// });


//>>>>using express
import express from 'express';
const server = express();

server.listen(config.port, ()=>{
    console.log("express is listening on port: ", config.port);
});

//express to handle routes
server.get('/', (req, res) => {
    res.send("Hello from express!!\n");
});

// import fs from 'fs';
// server.get('/about.html', (req, res) => {
//     //find about.html in the current directory
//     fs.readFile('./about.html', (err, data) => {
//         res.send(data.toString());
//     });
// });

//>>>>>using express static middleware
//serve static assest automatically
//*in production, static content usually should be managed sepearted from server code, using tools like NGINX
server.use(express.static('public'));


import apiRouter from './api';
server.use('/api', apiRouter);