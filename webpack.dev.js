const path = require('path');
const merge = require('webpack-merge');

const common = require('./webpack.config.js');

module.exports = merge(common, {
    devtool: 'source-map',
    mode: 'development',
    entry: './src/index.js'
});