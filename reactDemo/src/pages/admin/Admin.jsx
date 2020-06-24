import React,{Component} from "react"
import { Button } from 'antd';
import "antd/dist/antd.less"
export default class Admin extends Component{
    render(){
        return(
            <div>
                <h1>这是首页面</h1>
                <Button type="primary">Button</Button>
            </div>
        )
    }
}