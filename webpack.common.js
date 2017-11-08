/**
 *  项目名称：脚手架
 *  搭建时间：2017年10月5日
 *  作者: Abbott.liu
 *  描述: 前端环境配置
 *  功能：webpack 公有配置
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');// 热加载需要的 webpack

const autoprefixer = require('autoprefixer'); // 自动补全css3前缀
// the path(s) that should be cleaned
let pathsToClean = [
    'dist',
    'static'
]
// the clean options to use
let cleanOptions = {
    root:     '/static',
    // exclude:  ['*.html'],
    verbose:  true,
    dry:      false
}

const config = {
    entry: {
        index: './src/index.js',
        vendor: [
            'lodash'
        ]
    },
    module: {
        rules: [
            /*
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            */
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]

            },
            {
                test: /\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    'react-hot-loader', // react 热替换
                    'babel-loader' // .babelrc 具体配置文件
                ]
            },
            {
                test:/\.jsx?$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                query:{
                    presets:['env', 'react', 'stage-0']
                }
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            /*
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192&name=[path][name].[ext]'
            }
            */
            {
                test:/\.(png|jpg|gif|woff|svg|eot|ttf)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit:50000,   //小于50K的 都打包
                            name:"[hash:8].[name].[ext]",
                            // publicPath:"img/",  //替换CSS引用的图片路径 可以替换成爱拍云上的路径
                            // outputPath:"../img/"        //生成之后存放的路径
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        // new CleanWebpackPlugin(['static']),
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new webpack.HotModuleReplacementPlugin(), // 热加载的插件，使用缓存时请注释
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        new webpack.ProvidePlugin({ // 将 $ 变量挂载到 window 下面，可以在项目中直接使用 $ 不用再引用
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        })
    ],
    // 通过 output.filename 和 output.path 属性，来告诉 webpack bundle（捆）的名称，以及我们想要生成（emit）到哪里
    output: {
        filename: '[name].bundle.js',
        // filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'static')
    },
    externals: {

    }
};

module.exports = config;



