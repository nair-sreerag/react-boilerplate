const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode : "development",
    output : {
        // edit the path name as per your convenience
        path : path.resolve(__dirname),
        filename : "bundle.js"

    },
    entry : __dirname + '/src/index.js',
    devServer:{
        contentBase : "./src",
        inline : true,
        port : 8080
    }, 
    module: {
        rules: [
          { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
          { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
          { test : /\.css$/, use : ["style-loader", "css-loader"] }
        ]
    },
    // plugins: [
    //     new HtmlWebpackPlugin(),
    // ],
}   