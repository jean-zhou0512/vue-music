'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const express = require('express')
const app = express()
const apiRoutes = express.Router();
const axios = require('axios')
app.use('api',apiRoutes);

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app){
      app.get('/api/getDiscList',function(req,res){
            const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';

            axios.get(url,{
                headers:{
                host:'y.qq.com',
                referer:'https://y.qq.com/'
              },
              params:req.query// 通过req从浏览器端发过来的一堆参数(platform，sin，ein等)透传给qq的服务端
            }).then(response=>{// qq服务端的响应数据，再通过res将响应数据输出到浏览器端
              res.json(response.data)
            }).catch( (e) => {
              console.log(e);
            })
      });
      app.get('/api/getSingersList',function(req,res){
        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
        axios.get(url,{
          headers:{
              host:'u.y.qq.com',
              referer:'https://y.qq.com/'
          },
          params:req.query
        }).then(response =>{
            res.json(response.data)
        }).catch((e)=>{
          console.log(e);
        })
      });
      app.get('/api/getSingerDetail',function(req,res){
        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
        axios.get(url,{
          headers:{
            host:'u.y.qq.com',
            referer:' https://y.qq.com',
          },
          params:req.query
        }).then(response =>{
          res.json(response.data)
        }).catch((e)=>{
          console.log(e);
        })
      });
      app.get('/api/getSongVkey',function(req,res){
        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
        axios.get(url,{
          headers:{
            host:'u.y.qq.com',
            referer:' https://y.qq.com',
          },
          params:req.query
        }).then(response =>{
          res.json(response.data)
        }).catch((e)=>{
          console.log(e);
        })
      });

      app.get('/api/getSongLyric',function(req,res){
        const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
        axios.get(url,{
          headers:{
            host:'u.y.qq.com',
            referer:'https://y.qq.com',
          },
          params:req.query
        }).then(response =>{
          res.json(response.data)
        }).catch((e)=>{
          console.log(e);
        })
      });

      app.get('/api/getRecomSongs',function(req,res){
        // const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
        axios.get(url,{
          headers:{
            host:'c.y.qq.com',
            referer:'https://y.qq.com/',
          },
          params:req.query
        }).then(response =>{
          res.json(response.data)
        }).catch((e)=>{
          console.log(e);
        })
      });

      app.get('/api/getRankSongList',function (req,res) {
        const url='https://u.y.qq.com/cgi-bin/musicu.fcg'
        axios.get(url,{
          headers:{
            host:'u.y.qq.com',
            referer:'https://y.qq.com/m/index.html?tab=toplist',
          },
          params:req.query
        }).then(response =>{
          res.json(response.data)
        }).catch((e)=>{
          console.log(e);
        })
      });

      app.get('/api/getRankSongDetails',function (req,res) {
        console.log(req,res)
        const url= 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        axios.get(url,{
          headers:{
            host:'u.y.qq.com',
            referer:'https://y.qq.com/',
          },
          params:req.query
        }).then(response =>{
          res.json(response.data)
        }).catch((e)=>{
          console.log(e);
        })
      });

      app.get('/api/getSearchQuery',function (req,res) {
        console.log(req,res)
        const url= ' https://u.y.qq.com/cgi-bin/musicu.fcg'
        axios.get(url,{
          headers:{
            host:'u.y.qq.com',
            referer:'https://y.qq.com/',
          },
          params:req.query
        }).then(response =>{
          res.json(response.data)
        }).catch((e)=>{
          console.log(e);
        })
      });

      app.get('/api/getQueryDetail',function (req,res) {
        console.log(req,res)
        const url= 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
        axios.get(url,{
          headers:{
            host:'c.y.qq.com',
            referer:'https://y.qq.com/m/index.html',
          },
          params:req.query
        }).then(response =>{
          res.json(response.data)
        }).catch((e)=>{
          console.log(e);
        })
      });
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
