// look for config.js at same level, '../' for going up a level
// {} - destructure for importing none-default exports
import config from './config';
import express from 'express';
const server = express();

// using node sass middleware, read form ../sass and output a style.css to ../public
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public')
}));

//render ejs template
server.set('view engine', 'ejs');

import serverRender from './serverRender';

server.get(['/', '/contest/:contestId'], (req, res) => {
  let contestId = req.params.contestId; //if on contest page, id is the number in url. if on home page, it's undefined
  serverRender(contestId)
    .then(({initialData, initialMarkup}) => {
      res.render('index', {initialData, initialMarkup});  //pass both to EJS
    })
    .catch( error => {
      console.error(error);
      res.status(404).send('Bad Request');
    });
  // res.render('index', {
  //   content: 'Hello from EJS from server.js!!'
  // });
});

//manage all api requests in api module, import the handler here and use with express middleware
//the order does matter here, if route handling is below server.listen(), then ejs tempalte doesn't work
import apiRouter from './api';
server.use('/api', apiRouter);


//>>>>>using express static middleware
//serve static assest automatically
//*in production, static content usually should be managed sepearted from server code, using tools like NGINX
server.use(express.static('public'));

server.listen(config.port,  config.host, () => {
  console.info('express is listening on port: ', config.port);
});


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

//express to handle routes
// server.get('/', (req, res) => {
//     res.send("Hello from express!!\n");
// });

// import fs from 'fs';
// server.get('/about.html', (req, res) => {
//     //find about.html in the current directory
//     fs.readFile('./about.html', (err, data) => {
//         res.send(data.toString());
//     });
// });

