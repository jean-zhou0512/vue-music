import {commonParams,options} from './config';
import axios from 'axios';

export function getSingersList(){
  // const url ="/api/getSingersList";
  //const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
  const url = 'http://47.102.197.42/cgi-bin/musicu.fcg';
  const data = Object.assign({},commonParams,{
    hostUin:0,
    format:'json',
    notice:0,
    platform:'yqq',
    needNewCode:0,
    g_tk:5381,
    data: {"comm":{"ct":24,"cv":0},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}
  })

  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data);
  })
}

export function getSingerDetail(singerMid){
  // const url="/api/getSingerDetail";
  const url = 'http://47.102.197.42/cgi-bin/musicu.fcg';
  const data=Object.assign({},commonParams,{
      g_tk: 5381,
      hostUin: 0,
      format: 'json',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0,
      data:{
        comm:{"ct":24,"cv":0},
        singerSongList:{"method":"GetSingerSongList","param":{"order":1,"singerMid":singerMid,"begin":0,"num":100},"module":"musichall.song_list_server"}
      }
  })

  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data);
  })
}


export   function getSongVkey(songMid){
  // const url="/api/getSongVkey";
  const url = 'http://47.102.197.42/cgi-bin/musicu.fcg';
  const data=Object.assign({},commonParams,{
    g_tk: 5381,
    hostUin: 0,
    format: 'json',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      req:{
          module:"CDN.SrfCdnDispatchServer",
        method:"GetCdnDispatch",
        param:{guid:"9333179046",calltype:0,userip:""}},
      req_0:{
        module:"vkey.GetVkeyServer",
        method:"CgiGetVkey",
        param:{guid:"9333179046",
          songmid:[songMid],
          songtype:[0],
          uin:"2434153436",
          loginflag:1,
          platform:"20"}},
      comm:{uin:2434153436,format:"json",ct:24,cv:0}
    }
  })

  return   axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data);
  })
}

