import React from 'react';
import ReactDom from 'react-dom';


// ReactDom.render(
//     //what to render - create a h2 element
//     React.createElement('h2', null, 'Hello React from index.js!!!'),
//     //where to render - render it to an element in DOM has id=root
//     document.getElementById('root')
// );

//react api creating HTML directly but can be uncommon.
//JSX to use HTML directly, with babel compling the JSX code into react - write famaliar HTML, 
//and get benefit of react virtual dom the same time (question: which line did babel confirgue this?)

const color = Math.random() > 0.5 ? 'green' : 'red';

ReactDom.render(
    <h2 style={{color: color}} className="text-center">
        Hello React from index.js by JSX!!!!  {Math.random()}
    </h2>,
    document.getElementById('root')
);