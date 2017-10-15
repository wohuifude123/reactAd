/**
 *  作者：Abbott.liu
 *  搭建时间：2017年10月5日
 *  功能：webpack 开发环境
 */

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        // contentBase: './static',
        contentBase: [path.join(__dirname, "./static")], // 本地服务器 加载页面 所在的目录
        // port:7000,
        hot: true // 服务器热加载
    }
});
