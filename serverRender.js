import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/components/App';

import axios from 'axios';
import config from './config';

//goal: have server pre-render the data, so when we curl the app, it will have the data ready. 
//(instead of opening the app on broswer & have JS render the app to get data ready) 

//(1) let server fetch data from API (pretend api is a seperate app)
//(2)

const serverRender = () =>
  axios.get(`${config.serverUrl}/api/contests`)
    .then( resp => {
      //console.log(resp.data);
      //(2)
      return ReactDOMServer.renderToString(
        <App initialContests={resp.data.contests}/>
      );
    });


export default serverRender;


//question: without adding config.host to server.listen() in server.js, why it still works