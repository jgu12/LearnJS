//handle all the api call logic

import axios from 'axios';

//fetch signle contest, takes an ID, returns an axios promise
export const fetchContest = contestId => {
  return axios.get(`/api/contests/${contestId}`)
    .then(resp => resp.data);  //also return the data from resp?? same as resp => resp.data?? function(resp){return resp.data}
};

//fetch signle contest, takes an ID, returns an axios promise
export const fetchContestList = () => {
  return axios.get('/api/contests')
    .then(resp => resp.data.contests);  //also return the data from resp?? same as resp => resp.data?? function(resp){return resp.data}
};

//nameIds is an array, use join() to join make it meets the api syntax "..names/100,102,103"
export const fetchNames = (nameIds) => {
  return axios.get(`/api/names/${nameIds.join(',')}`)
    .then(resp => resp.data.names);
};