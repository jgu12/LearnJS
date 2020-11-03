const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};

/*
bundle all modules we denpend on inisde the entry index.js
into a bundle.js file under public directory
Then for every js file we run bable loader on them, which
transfroms the non-standard JS.
*/

//what's the difference?? 
//----json loader removed from webpack on v2+ 

// module.exports = {
//   entry: './src/index.js',
//   output: {
//     path: __dirname + '/public',
//     filename: 'bundle.js'
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.json$/,
//         loader: 'json-loader'
//       },
//       {
//         test: /\.js$/,
//         loader: 'babel-loader'
//       }
//     ]
//   }
// };
