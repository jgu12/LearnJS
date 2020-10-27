import React from 'react';
// import PropTypes from 'prop-types';
import Header from './Header';

//if need state & lifecyle
class App extends React.Component {
  state = {
    pageHeader: 'Naming Contests'
  };

  //componet lifecyle hooks:
  // componentDidMount(){
  //   //usually do ajax fetching, when got something back from the server, 
  //   //we are sure we have the target in dom to modify
  //   //also timers, listeners.. and clean up in componentWillUnmount
  // }
  render() {
    return (
      <div className="App">
        <Header message={this.state.pageHeader} />
        <div>
          .....
        </div>
      </div>
    );
  }
}

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

export default App;