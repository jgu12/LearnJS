import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import ContestPreview from './ContestPreview';
// import data from '../testData'; ////for testing
import axios from 'axios';


//if need state & lifecyle, extend react.component
class App extends React.Component {
  state = {
    pageHeader: 'Naming Contests',
    contests: []
  };

  //usually do ajax fetching, when got something back from the server, 
  //we are sure we have the target in dom to modify
  //also timers, listeners.. and clean up in componentWillUnmount
  componentDidMount() {
    //ajax call to fetch data from remote API - using axios library
    axios.get('/api/contests')
      .then( resp => {
        console.log('getting resp object', resp);
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

  //Question: the '...' operator allows an expression to be expanded in places where mutiple args are expected
  render() {
    return (
      <div className="App">
        <Header message={this.state.pageHeader} />
        <div>
          {this.state.contests.map(
            (contest) => <ContestPreview {...contest} key={contest.id} />
          )}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  contests: PropTypes.array.isRequired
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