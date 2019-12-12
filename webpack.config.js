const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: './src/app/app.js',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ],
        alias: {
            // eslint-disable-next-line max-len
            '@less-helpers-module': path.resolve(__dirname, 'src/assets/less/helpers'), // alias for less helpers
            // eslint-disable-next-line max-len
            '@assets-root-path': path.resolve(__dirname, 'src/assets') // alias for assets (use for images & fonts)
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                options: {
                    knownHelpersOnly: false,
                    partialDirs: [path.join(__dirname, '/handlebars/')],
                    helperDirs: [path.join(__dirname, '/src/helpers/')]
                },
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            }, {
                test: /\.(jpg|jpeg|png|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[name].[ext]'
                    }
                }]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
        new CopyWebpackPlugin([
            'src/index.html', // will copy to root of outDir (./dist folder)
            {
                from: 'src/static/',
                to: 'static'
            },
            {
                from: 'src/assets/images',
                to: 'images'
            }
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    devServer: {
        contentBase: './dist',
        port: 3000
    }
};


