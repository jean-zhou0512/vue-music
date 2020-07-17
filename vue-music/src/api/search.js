import {commonParams,options} from './config';
import axios from 'axios';

export function getSearchQuery(){
  // const url ="/api/getSearchQuery";
  // const url= ' https://u.y.qq.com/cgi-bin/musicu.fcg'
  const url= ' http://47.102.197.42/cgi-bin/musicu.fcg'
  const data = Object.assign({},commonParams,{
    cgiKey: 'GetHomePage',
    data: {
        "comm":{
            g_tk:5381,
            format:"json",
            inCharset:"utf-8",
            outCharset:"utf-8",
            notice:0,
            platform:"h5",
            needNewCode:1
          },
        "MusicHallHomePage":{
            module:"music.musicHall.MusicHallPlatform",
            method:"MobileWebHome",
            param:{"ShelfId":[101,102,161]}},
        "hotkey":{
          module:"tencent_musicsoso_hotkey.HotkeyService",
          method:"GetHotkeyForQQMusicMobile",
          param:{"remoteplace":"txt.miniapp.wxada7aab80ba27074",
          searchid:"1559616839293"
          }
        }
    }
  })

  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data);
  })
}

export function getQueryDetail(query,page,zhida,perpage){
  // const url ="/api/getQueryDetail";
  // const url= 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  const url= 'http://47.102.197.42/soso/fcgi-bin/search_for_qq_cp'
  const data = Object.assign({},commonParams,{
    g_tk: 5381,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    w: query,//输入内容
    zhidaqu: zhida?1:0,//是否需要歌手信息 1：需要 0：不需要
    catZhida: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage:perpage,
    n: perpage,
    p: page,//搜索第几页
    remoteplace: 'txt.mqq.all'
  })

  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data);
  })
}
