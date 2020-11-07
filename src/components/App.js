import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import ContestList from './ContestList';
// import data from '../testData'; ////for testing
import Contest from './Contest';
import * as api from '../api.js';
// import axios from 'axios';


const pushState = (obj, url) => {
  window.history.pushState(obj, '', url);
};

const onPopState = handler => {
  window.onpopstate = handler;
};

//if need state & lifecyle, extend react.component
class App extends React.Component {
  state = this.props.initialData;

  //usually do ajax fetching, when got something back from the server, 
  //we are sure we have the target in dom to modify
  //also timers, listeners.. and clean up in componentWillUnmount
  // componentDidMount() {
  //ajax call to fetch data from remote API - using axios library - now returns an object
  // axios.get('/api/contests')
  //   .then( resp => {
  //     console.log('getting resp object -- inside App componetDidMount cycle', resp);
  //     this.setState({
  //       contests: resp.data.contests
  //     });
  //   }) 
  //   .catch(function(error) {
  //     console.error(error);
  //   });
  // }

  componentDidMount() {
    onPopState( (event) => {
      // console.log(event);
      this.setState({
        currentContestID: (event.state || {}).currentContestID
      });
    });
  }

  componentWillUnmount() {
    //need to clear func regsitered in component did mount
    onPopState(null);
  }

  //go back to home contest list page
  fetchContestList = () => {
    pushState(
      { currentContestID: null },
      '/'
    );
    api.fetchContestList().then(contests => {
      this.setState({
        currentContestID: null,
        contests
      });
    });
  };

  //use for everytime we click on a contest. Pass the func all the way to ContestPreview,
  //onClick calls the func & pass in the clicked contest-id, save the id back id
  fetchContest = (contestID) => {
    pushState(
      { currentContestID: contestID },  //save the ID received in browser.history.state
      // This is causing trouble: it is making api.js querying url http://localhost:8080/contest/api/contests/3.
      //<<---FIXED, in api.js, missed / before 'api/contests/...'
      `/contest/${contestID}`
    );

    //fetch contest data from api call (gets a axios promise), then when contest is ready, 
    api.fetchContest(contestID).then(contest => {
      this.setState({
        // pageHeader: contest.contestName,
        currentContestID: contest.id,
        //modify the contests object, copy the current contest, but change the object assoicated with id to the new contest object from server api call (with description)
        contests: {
          ...this.state.contests,
          [contest.id]: contest   ///???
        }
      });
    });
  };

  //just call api, takes an name ID array
  //api call gives back a names object, save the objec to state
  fetchNames = (nameIds) => {
    if(nameIds.length === 0){
      return;
    }
    api.fetchNames(nameIds).then(names => {
      this.setState({
        names
      });
    });
  }

  //look up the names by ID once names is in state
  lookupName = (nameId) => {
    if(!this.state.names || !this.state.names[nameId]){
      return {name: '...'};
    }
    return this.state.names[nameId]; //object {"nameId" : {"id":"", "name":"", "timestamp": ".."}}
  }

  //refactor
  currentContest(){
    return this.state.contests[this.state.currentContestID];
  }
  pageHeader(){
    if(this.state.currentContestID) {
      return this.currentContest().contestName;
    }
    return 'Naming Contests';
  }

  //if currentContestID is empty, display initial full list. 
  //if clicked on individual contest, display the single contest
  currentContent(){
    if(this.state.currentContestID == null){
      return (
        <ContestList
          onContestClick = {this.fetchContest}
          contests={this.state.contests} 
        />
      );
    } else {
      return (
        <Contest 
          contestListClick={this.fetchContestList}
          fetchNames={this.fetchNames}
          lookupName={this.lookupName}
          {...this.currentContest()}
        />
      );
    }
  }

  render() {
    //debugger;
    //pass the fetchContest func all the way to ContestPreview for its onClick
    return ( 
      <div className="App">
        <Header message={this.pageHeader()} />
        {this.currentContent()}
      </div>
    );
  }
}

App.propTypes = {
  contests: PropTypes.array,
  initialContests: PropTypes.object,
  initialData: PropTypes.object.isRequired
};

export default App;



// if just need stateless, use this sytanx is enough
// const App = () => {
//   return (
//     <div className="App">
//       <Header message='Header message!' />
//       <div>
//         .....
//       </div>
//     </div>
//   );
// };