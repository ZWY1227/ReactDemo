import React, { Component } from "react"
import One from "./AAA.jsx"
import Two from "./BBB.jsx"
import {Route,Switch}from "react-router-dom"
export default class Shop extends Component{
    render(){
        return(
            <Switch>
                <Route path="/admin/shop/one" component={One}>我是通过组件里面的内容渲染的</Route>
                <Route path="/admin/shop/two" component={Two}>this.props.children
                </Route>
            </Switch>
        )
    }
}