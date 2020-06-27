import ajax from "./axios"
import jsonp from "jsonp"
//登录接口的封装
export const reqlogin=(username,password)=>ajax("/login",{username,password},"POST")
//天气接口的封装
export const reqweather=(city)=>{
    return new Promise((resolve,reject)=>{
        let url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(err,data)=>{
            // console.log(data.results[0].weather_data[0].dayPictureUrl,data.results[0].weather_data[0].weather)
            if(data.status==="success"){
                let url=data.results[0].weather_data[0].dayPictureUrl
                let weather=data.results[0].weather_data[0].weather
                resolve({url,weather})
            }
        })
    })
}
