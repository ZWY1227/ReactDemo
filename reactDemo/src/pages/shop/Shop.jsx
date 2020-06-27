import React, { Component } from "react"
import One from "./AAA.jsx"
import Two from "./BBB.jsx"
import {Route,Switch}from "react-router-dom"
export default class Shop extends Component{
    render(){
        return(
            <Switch>
                <Route path="/admin/shop/one" component={One}></Route>
                <Route path="/admin/shop/two" component={Two}>
                </Route>
            </Switch>
        )
    }
}