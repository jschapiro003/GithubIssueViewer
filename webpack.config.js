var webpack = require('webpack');  
module.exports = {  
    //tells webpack where the entry file is
    entry: [
      'webpack/hot/only-dev-server',
      "./js/app.js"
    ],
    //where the bundled files should go
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    //where you add/remove loaders based on what you need webpack to bundle for you
    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
      new webpack.NoErrorsPlugin()
    ]

};