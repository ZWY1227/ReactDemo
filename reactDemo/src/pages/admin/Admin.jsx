import React, { Component } from "react"
import "antd/dist/antd.less"
import memory from "../../util/memory"
import { Redirect } from "react-router-dom"
import "./admin.css"
// 引入二级路由
import {Route,Link,Switch} from "react-router-dom"
import Home from "../home/Home"
import Shop from "../shop/Shop"
import User from "../user/User"
import Role from "../role/Role"
import Pic from "../pic/Pic"
import Order from "../order/order"

import { Layout, Menu } from 'antd';

import {
    UploadOutlined,
    WindowsOutlined,
    AreaChartOutlined,
    SafetyOutlined,
    UserOutlined,
    HomeOutlined
} from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {
        let { user } = memory
        if (user && user._id) {
            return (
                <Layout style={{ height: '100%' }} className="big">
                    <Sider className="sid">
                        <h1 className="h">后台管理</h1>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1" icon={<HomeOutlined />}><Link to="/home">首页</Link></Menu.Item>
                            <SubMenu key="2" icon={<UploadOutlined />} title="商品">
                                <Menu.Item key="3"><Link to="/shop/one">品牌管理</Link></Menu.Item>
                                <Menu.Item key="4"><Link to="/shop/two">商品管理</Link></Menu.Item>
                            </SubMenu>
                            <Menu.Item key="5" icon={<UserOutlined />}><Link to="/user">用户管理</Link></Menu.Item>
                            <Menu.Item key="6" icon={<SafetyOutlined />}><Link to="/role">角色管理</Link></Menu.Item>
                            <SubMenu key="7" icon={<AreaChartOutlined />} title="图标管理">
                                <Menu.Item key="8"><Link to="/pic/bing">饼图</Link></Menu.Item>
                                <Menu.Item key="9"><Link to="/pic/zhe">折线图</Link></Menu.Item>
                                <Menu.Item key="10"><Link to="/pic/zhu">柱形图</Link></Menu.Item>
                            </SubMenu>
                            <Menu.Item key="11" icon={<WindowsOutlined />}><Link to="/order">订单管理</Link></Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="small">
                        <Header className="hea">Header</Header>
                        <Content className="con">
                        <Switch>
                            <Route path="/home" component={Home}></Route>
                            <Route path="/shop" component={Shop}></Route>
                            <Route path="/user" component={User}></Route>
                            <Route path="/role" component={Role}></Route>
                            <Route path="/pic" component={Pic}></Route>
                            <Route path="/order" component={Order}></Route>
                            <Route component={Home}></Route>
                        </Switch>
                        </Content>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>
            )
        } else {
            return (
                <Redirect to="/login"></Redirect>
            )
        }
    }
}