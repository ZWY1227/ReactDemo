import React, { Component } from "react"
import "antd/dist/antd.less"
import memory from "../../util/memory"
import { Redirect } from "react-router-dom"
import "./admin.css"
// 引入二级路由
import {Route,Switch} from "react-router-dom"
import Home from "../home/Home"
import Shop from "../shop/Shop"
import User from "../user/User"
import Role from "../role/Role"
import Pic from "../pic/Pic"
import Order from "../order/order"
import Hea from "../../components/head/Hea"
import Left from "../../components/left/Left"

import { Layout } from 'antd';

const { Footer, Content } = Layout;

export default class Admin extends Component {
    render() {
        let { user } = memory
        if (user && user._id) {
            return (
                <Layout style={{ height: '100%' }} className="big">
                   <Left></Left>
                    <Layout className="small">
                        <Hea></Hea>
                        <Content className="con">
                        <Switch>
                            <Route path="/admin/home" component={Home}></Route>
                            <Route path="/admin/shop" component={Shop}></Route>
                            <Route path="/admin/user" component={User}></Route>
                            <Route path="/admin/role" component={Role}></Route>
                            <Route path="/admin/pic" component={Pic}></Route>
                            <Route path="/admin/order" component={Order}></Route>
                            <Redirect from="/" to="/admin/home"></Redirect>
                        </Switch>
                        </Content>
                        <Footer>学习react so~easy</Footer>
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