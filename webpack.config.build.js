const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = {
    mode: 'production',
    entry: './src/lib/index.js',
    output: {
        path: path.join(__dirname, './build'),
        filename: 'index.js',
        library: 'MultiSelect',
        libraryTarget: 'umd',
        publicPath: '/build/',
        umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        }]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({})
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
            'styled-components': path.resolve(__dirname, './node_modules/styled-components'),
            'styled-icons': path.resolve(__dirname, './node_modules/styled-icons')
        }
    },
    // CRL: add externals block since it's a library
    //  no need to ship React since it's shipped with the main app
    externals: {
        // Don't bundle react or react-dom      
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM"
        },
        'styled-components': 'styled-components',
        'styled-icons': 'styled-icons'
    }
};