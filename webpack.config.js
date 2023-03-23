import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

var config = {}
export default config = {
    context: path.join(process.cwd(), "/"),
    entry: {
        createOrder: './src/script/createOrder.js',
        orderHistory: './src/script/orderHistory.js',
        placeOrder: './src/script/placeOrder.js',
    },
    output: {
        path: path.resolve(process.cwd(), './dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     title: 'ESOP Trading',
        //     template: path.resolve(process.cwd(), './src/pages/template.html'), // template file
        //     filename: 'index.html', // output file
        // }),
        new HtmlWebpackPlugin({
            title: 'ESOP Trading',
            chunks: ['placeOrder'],
            template: path.resolve(process.cwd(), './src/pages/createOrder.html'), // template file
            filename: 'index.html', // output file
        }),
        new HtmlWebpackPlugin({
            title: 'ESOP Trading',
            chunks: ['orderHistory'],
            template: path.resolve(process.cwd(), './src/pages/orderHistory.html'), // template file
            filename: 'orderHistory.html', // output file
        }),
        new MiniCssExtractPlugin(),
        // new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // CCS
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        static: path.resolve(process.cwd(), './dist'),
        open: true,
        compress: true,
        hot: true,
        port: 5502,
    },

};