var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var port = process.env.PORT || config.build.port

var app = express()

var apiRoutes = express.Router()

apiRoutes.get('/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/',
      host: 'y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
});

apiRoutes.get('/getSingersList',function(req,res){
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

apiRoutes.get('/getSingerDetail',function(req,res){
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

apiRoutes.get('/getSongVkey',function(req,res){
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

apiRoutes.get('/getSongLyric',function(req,res){
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

apiRoutes.get('/getRecomSongs',function(req,res){
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
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

apiRoutes.get('/getRankSongList',function (req,res) {
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

apiRoutes.get('/getRankSongDetails',function (req,res) {
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

apiRoutes.get('/getSearchQuery',function (req,res) {
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

apiRoutes.get('/getQueryDetail',function (req,res) {
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

app.use('/api', apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://47.102.197.42:' + port + '\n')
})
