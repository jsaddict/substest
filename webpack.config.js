var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');

var precss = require('precss');
var cssnext = require('postcss-cssnext');

var port = process.env.PORT ? process.env.PORT : 5555;

module.exports = {
    context: path.resolve(__dirname, './src'),
    devtool: debug ? 'inline-source-map' : null,
    entry: debug ?
        [
            'babel-polyfill',
            'webpack-hot-middleware/client?path=http://localhost:' + port + '/__webpack_hmr',
            './app.js',
        ] :
        [
            'babel-polyfill',
            './app.js',
        ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                },
            },
            {
                test: /\.css$/,
                // loader: 'style!css?sourceMap'
                loader: "style-loader!css-loader!postcss-loader?sourceMap=inline"
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }
        ]
    },
    postcss: function () {
        return [precss, cssnext];
    },
    output: debug ? {
        library: 'TS',
        libraryTarget: 'umd',
        path: __dirname + '/dist/',
        filename: 'bundle.js',
        publicPath: 'http://localhost:' + port + '/'
    } : {
            library: 'TS',
            libraryTarget: 'umd',
            path: __dirname + '/dist/',
            filename: 'bundle.js'
        },
    plugins: debug ? [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ] : [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: true },
                mangle: false,
                sourcemap: false
            })
        ]
};