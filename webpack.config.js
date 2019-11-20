const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'resource'),
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin({
            title: 'Clip-Graph'
        }),
    ]
}