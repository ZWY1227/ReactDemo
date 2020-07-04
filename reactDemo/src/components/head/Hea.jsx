import React,{Component} from "react"
import {Layout, message } from 'antd';
import "./hea.css"
import filterTime from "../../util/filter_fun"
import {reqweather} from "../../Api/index"
import {withRouter} from "react-router-dom"
import menuList from "../../config/menuConfig"
import memory from "../../util/memory"
import local from "../../util/local"


import { Modal } from 'antd';

const { confirm } = Modal;
const { Header} = Layout;

class Hea extends Component{
    state={
        url:"",
        weather:"",
        time:""
    }
    outLogin=()=>{
        confirm({
            title: '提示',
            content: '您确定要退出登录吗？',
            onOk:()=>{
                //走到这里说明确定退出，那就清空内存和硬盘
                local.removeStor()
                memory.user={}
                message.success("您已退出登录")
                this.props.replace("/login")
            },
            onCancel() {
                message.error("nook")
            },
          });
    }
    render(){
        let title=this.getTitle()
        let {url,weather,time}=this.state
        let {user}=memory
        return(
            <Header className="he" >
                <div className="top">
                    <ul>
                        <li>
                            欢迎: {user.username}
                        </li>
                        <li>
                            <button onClick={this.outLogin}>退出</button>
                        </li>
                    </ul>
                </div>
                <div className="bottom">
                    <div className="left">
                    {title}
                    </div>
                    <div className="right">
                        <ul>
                            <li>
                                {time}
                            </li>
                            <li>
                                <img src={url} alt={url}></img>
                            </li>
                            <li>
                                {weather}
                            </li>
                        </ul>
                    </div>
                </div>
            </Header>
        )
    }
    //初始化时间，当时间变化，就调用格式化时间赋值给当前time
    setTime=()=>{
        setInterval(()=>{
        let time=filterTime(Date.now())
        this.setState({time})
        },1000)
    }
    //调用接口来拿到天气和图片
    getWeather=async()=>{
       let result=await reqweather("郑州")
       if(result){
           let weather=result.weather
           let url=result.url
           this.setState({weather,url})
       }   
    }
    getTitle=()=>{
        let path=this.props.location.pathname
        let title=""
        menuList.forEach((item,index)=>{
            if(!item.children){
                if(item.key===path){
                    title=item.title
                }
            }else{
                item.children.forEach((items,ind)=>{
                    if(items.key===path){
                        title=items.title
                    }
                }) 
            }
        })
        return title
    }
    componentDidMount(){
        this.setTime()
        this.getWeather()
    }
}

export default withRouter(Hea)