import React from 'react';
import ReactDom from 'react-dom';
// import PropTypes from 'prop-types';

//(1)
// ReactDom.render(
//     //what to render - create a h2 element
//     React.createElement('h2', null, 'Hello React from index.js!!!'),
//     //where to render - render it to an element in DOM has id=root
//     document.getElementById('root')
// );

//(2)
//react api creating HTML directly but can be uncommon.
//JSX to use HTML directly, with babel compling the JSX code into react - write famaliar HTML, 
//and get benefit of react virtual dom the same time (question: which line did babel confirgue this?)

// const color = Math.random() > 0.5 ? 'green' : 'red';
// ReactDom.render(
//     <h2 style={{color: color}} className="text-center">
//         Hello React from index.js by JSX!!!!  {Math.random()}
//     </h2>,
//     document.getElementById('root')
// );

//(3) 
// use componets to clean up code, and further split into individual files under ./components

// const Header = (props) => {
//   const color = Math.random() > 0.5 ? 'green' : 'red';
//   return (
//     <h2 style={{color: color}} className="Header text-center">
//       {props.message}
//     </h2>
//   );
// };

// const App = () => {
//   return (
//     <div className="App">
//       <Header message = 'Header message!'/>
//       <div>
//         .....
//       </div>
//     </div>
//   );
// };

// App.propTypes = {
//   message: PropTypes.string.isRequired
// };

// Header.propTypes = {
//   message: PropTypes.string
// };


import App from './components/App';

//reading data from memeory. If reading from API, it will take time, 
//we can render the APP with empty array, and render late in Component from state 
//and if another code is rendering the same APP but providing non-empty props, it will render with data
// import data from './testData';



ReactDom.render(
  <App initialContests={window.initialData.contests} contests={[]}/>,
  document.getElementById('root')
);