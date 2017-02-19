var webpack = require('webpack');

module.exports = {
    entry: __dirname+'/src/app.js',
    output: {
        filename: 'bundle.js'
    },
    module:{
        loaders: [{
            test: /\.hbs$/,
            loader: 'handlebars-loader?helperDirs[]='+__dirname+'/src/util/handlebars-helpers'
        },{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query:{
                presets:['es2015', 'es2016']
            }
        }]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    devServer: {
        inline: true,
        port: 7777,
        contentBase: __dirname,
        historyApiFallback: true
    }
};