import React, { Component } from "react"
import Add from "./children/add"
import Detail from "./children/detail"
import Show from "./children/show"
import {Switch,Route} from "react-router-dom"
export default class Two extends Component{
    render(){
        return(
            <Switch>
                <Route path="/admin/shop/two/add" component={Add}></Route>
                <Route path="/admin/shop/two/detail" component={Detail}></Route>
                <Route path="/admin/shop/two/show" component={Show}></Route>
                <Route path="/admin/shop/two/" component={Show}></Route>
            </Switch>
        )
    }
}