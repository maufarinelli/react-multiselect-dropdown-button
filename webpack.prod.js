const path = require('path');
const merge = require('webpack-merge');

const common = require('./webpack.config.js');

module.exports = merge(common, {
    mode: 'production',
    entry: './src/lib/index.js'
});