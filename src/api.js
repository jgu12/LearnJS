//handle all the api call logic

import axios from 'axios';

//fetch signle contest, takes an ID, returns an axios promise
export const fetchContest = contestId => {
  return axios.get(`/api/contests/${contestId}`)
    .then(resp => resp.data);  //also return the data from resp?? same as resp => resp.data?? function(resp){return resp.data}
};