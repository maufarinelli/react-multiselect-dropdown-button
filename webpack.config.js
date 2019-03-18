const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                    plugins: [
                        ["@babel/plugin-proposal-class-properties", {
                            "loose": true
                        }]
                    ]
                }
            }
        }, {
            test: /\.css$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader
                },
                "css-loader"
            ]
        }]
    },
    optimization: {
        minimizer: [new TerserPlugin()],
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new HtmlWebPackPlugin({
            hash: true,
            filename: "index.html", //target html
            template: "./public/index.html" //source html
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};