var PROD = process.argv.indexOf('-p') >= 0;
var webpack = require('webpack');

module.exports = {
    entry: {
        'flowchart': __dirname + '/index.js'
    },
    output: {
        libraryTarget: 'umd',
        library: ['flowchart'],
        path: __dirname + '/dist',
        filename: PROD ? '[name].min.js' : '[name].js'
    },
    externals: {
        'echarts/lib/echarts': 'echarts'
    },
    plugins: PROD
        ? [
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            })
        ]
        : []
};