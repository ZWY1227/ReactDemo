import React, { Component } from "react"
import {Route,Switch} from "react-router-dom"
import Bing from "./Bing"
import Zhe from "./Zhe"
import Zhu from "./Zhu"
export default class Pic extends Component{
    render(){
        return(
            <Switch>
                <Route path="/admin/pic/bing" component={Bing}></Route>
                <Route path="/admin/pic/zhe" component={Zhe}></Route>
                <Route path="/admin/pic/zhu" component={Zhu}></Route>
            </Switch>
        )
    }
}