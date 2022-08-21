const path = require("path");
const webpack = require('webpack')

module.exports = {
    entry: './client/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    mode: 'development',
    devServer: {
        static: {
            directory: path.resolve(__dirname)
        },
        devMiddleware: {
            writeToDisk: true
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', "css-loader"],
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', 'jsx', 'css']
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        })
    ]
}

/*
devServer: {
        port: 3000,
        static: {
            directory: path.resolve(__dirname)
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true
        }
    },
*/