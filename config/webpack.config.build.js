const path = require("path");
const paths = require('./paths');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

process.env.NODE_ENV = 'production';

module.exports = {
    mode: 'production',
    entry: './src/lib/index.ts',
    output: {
        path: paths.appBuild,
        filename: 'index.js',
        library: 'MultiSelect',
        libraryTarget: 'umd',
        publicPath: '/build/',
        umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /\.(ts|tsx|js|jsx)$/,
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
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
            'styled-components': path.resolve(__dirname, './node_modules/styled-components')
        }
    },
    // CRL: add externals block since it's a library
    //  no need to ship React since it's shipped with the main app
    externals: {
        // Don't bundle react, react-dom and styled-components   
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
        'styled-components': {
            commonjs: "styled-components",
            commonjs2: "styled-components",
            amd: "styled-components",
            root: "styled-components"
        }
    },
    plugins: [
        new CopyPlugin({
            patterns: [
              { from: "./src/lib/index.d.ts", to: "./index.d.ts" },
            ],
        }),
    ],
};