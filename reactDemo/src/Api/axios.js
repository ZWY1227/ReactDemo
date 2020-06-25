import axios from "axios"

import {message} from "antd"
export default function ajax(url,data={},type="GET"){
    return new Promise((resolve,reject)=>{
        let result
        if(type==="GET"){
            result=axios.get(url,{params:data})
        }else{
            result=axios.post(url,data)
        }
        result.then(res=>{
            resolve(res.data)
        })
        .catch(err=>{
            message.error("访问接口出错")
            reject(err)
        })
    })
}