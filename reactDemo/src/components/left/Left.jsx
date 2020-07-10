import React,{Component} from "react"
import {Menu,Layout } from 'antd';
import {Link,withRouter} from "react-router-dom"
import menuList from "../../config/menuConfig"
import memory from "../../util/memory"
import "../../pages/admin/admin.less"

import {
    AreaChartOutlined,
    HomeOutlined
} from '@ant-design/icons';
const { SubMenu } = Menu;
const { Sider} = Layout;

class Left extends Component{
    state={
        newList:[]
    }
    render(){
        let path=this.props.location.pathname
        return(
            <Sider className="sid">
            <h1 className="h">后台管理</h1>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[path]}>
            {
                this.state.newList.length>=1 ?this.reqList(this.state.newList):this.reqList(menuList)
            }
            </Menu>
        </Sider>
        )
    }
    reqList=(menuList)=>{
        return (
            menuList.map((item)=>{
                if(!item.children){
                    return(
                        <Menu.Item key={item.key} icon={<HomeOutlined />}><Link to={item.key}>{item.title}</Link></Menu.Item>
                    )
                }else{
                    return(
                        <SubMenu key={item.key} icon={<AreaChartOutlined />} title={item.title}>
                    {
                        item.children.map((items)=>{
                            return (
                                <Menu.Item key={items.key}><Link to={items.key}>{items.title}</Link></Menu.Item>
                            )
                        })
                    }
                    </SubMenu>
                    )
                    
                }

            })
        )
    }
    newMunu=()=>{
        let arr=[]
        menuList.map(item=>{
           memory.user.role.menus.forEach(items=>{
                if(item.key===items){
                    arr.push(item)
                }
            }) 
        })
        this.setState({
            newList:arr
        })
    }
    componentWillMount(){
        this.newMunu()
    }
}
export default withRouter(Left)