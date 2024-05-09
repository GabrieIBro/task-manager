const path = require('path');

module.exports = {
    entry: {
      index:'./src/scripts/index.js',
      task:'./src/scripts/task.js'
    },

    output: {
      filename: '[name]-bundle.js',
      path: path.join(process.env.PWD, '/src/public/bundle/'),
    },
    watch: true,
    mode: 'development'
  };