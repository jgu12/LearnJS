import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import ContestList from './ContestList';
// import data from '../testData'; ////for testing
import Contest from './Contest';
import axios from 'axios';


const pushState = (obj, url) => {
  window.history.pushState(obj, '', url);
};


//if need state & lifecyle, extend react.component
class App extends React.Component {
  state = {
    pageHeader: 'Naming Contests',
    contests: this.props.initialContests  //
  };

  //usually do ajax fetching, when got something back from the server, 
  //we are sure we have the target in dom to modify
  //also timers, listeners.. and clean up in componentWillUnmount
  componentDidMount() {
    //ajax call to fetch data from remote API - using axios library - now returns an object
    axios.get('/api/contests')
      .then( resp => {
        console.log('getting resp object -- inside App componetDidMount cycle', resp);
        this.setState({
          contests: resp.data.contests
        });
      }) 
      .catch(function(error) {
        console.error(error);
      });

    // this.setState({
    //   contests: data.contests
    // });
  }

  //use for everytime we click on a contest. Pass the func all the way to ContestPreview,
  //onClick calls the func & pass in the clicked contest-id, save the id back id
  fetchContest = (contestID) => {
    pushState(
      { currentContestID: contestID },  //save the ID received in browser.history.state
      `/contest/${contestID}`  //url
    );

    this.setState({
      pageHeader: this.state.contests[contestID].contestName,
      currentContestID: contestID
    });
  }

  //if currentContestID is empty, display initial full list. 
  //if clicked on individual contest, display the contest
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
        <Contest {...this.state.contests[this.state.currentContestID]}/>
      );
    }
  }

  render() {
    //debugger;
    //pass the fetchContest func all the way to ContestPreview for its onClick
    return ( 
      <div className="App">
        <Header message={this.state.pageHeader} />
        {this.currentContent()}
      </div>
    );
  }
}

App.propTypes = {
  contests: PropTypes.array,
  initialContests: PropTypes.object
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