import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/components/App';

import axios from 'axios';
import config from './config';

//goal: have server pre-render the data, so when we curl the app, it will have the data ready. 
//(instead of opening the app on broswer & have JS render the app to get data ready) 

//(1) let server fetch data from API (pretend api is a seperate app)
//(2)

const getApiUrl = contestID => {
  if(contestID){
    return `${config.serverUrl}/api/contests/${contestID}`;
  }
  return `${config.serverUrl}/api/contests`;
};

const getInitialData = (contestID, apiData) => {
  if(contestID){
    return {
      currentContestID : apiData.id,  //currentContestID needs to match the one in App.js pushstate() ???
      contests: {
        [apiData.id]: apiData  //represents a single contest
      } 
    };
  }
  return {
    contests: apiData.contests
  };
};

const serverRender = (contestID) =>
  axios.get(getApiUrl(contestID))
    .then(resp => {
      const initialData = getInitialData(contestID, resp.data);
      return {
        initialData,     //the api returns an object, in the resp object's data field: resp.data
        initialMarkup: ReactDOMServer.renderToString(
          <App initialData={initialData}/>
        )
      };
    });


export default serverRender;


//question: without adding config.host to server.listen() in server.js, why it still works