import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import memory from "./util/memory"
import local from "./util/local"
import "./style.css"
memory.user=local.getStor()
ReactDOM.render(<App/>,document.getElementById("root"))