import {commonParams,options} from './config';
import axios from 'axios';

export function getRankSongList(){
  // const url ="/api/getRankSongList";
  // const url='https://u.y.qq.com/cgi-bin/musicu.fcg'
  const url='http://47.102.197.42/cgi-bin/musicu.fcg'
  const data = Object.assign({},commonParams,{
    data: {
        "comm":
          {
            "g_tk":5381,
            "format":"json",
            "inCharset":"utf-8",
            "outCharset":"utf-8",
            "notice":0,
            "platform":"h5",
            "needNewCode":1,
            "ct":23,
            "cv":0
          },
        "topList":
          {
            "module":"musicToplist.ToplistInfoServer",
            "method":"GetAll",
            "param":{}
          }
    }
  })

  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data);
  })
}

export function getRankSongDetails(topId,period){
  // const url ="/api/getRankSongDetails";
  // const url= 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const url= 'http://47.102.197.42/cgi-bin/musicu.fcg'
  const data = Object.assign({},commonParams,{
      g_tk: 5381,
      hostUin: 0,
      format: 'json',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0,
      data:
       {
          detail:
            {
              module:"musicToplist.ToplistInfoServer",
              method:"GetDetail",
              param:
                {
                  topId:topId,
                  offset:0,
                  num:100,
                  period:period
                }
              },
          comm:
            {
              ct: 24,
              cv:0
            }
        }
  })

  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data);
  })
}
