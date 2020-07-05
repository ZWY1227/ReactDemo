import React, { Component } from "react"
import { Card, List, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'
import { reqcatebyid } from "../../../Api/index"
export default class Detail extends Component {
    state = {
        name: "",
        nameson: ""
    }
    onGoback = () => {
        console.log(this.props.history.goBack())
    }
    render() {
        let { name, desc, price, detail, imgs, _id, categoryId, pCategoryId } = this.props.location.state.item
        console.log(imgs)
        const title = (
            <div>
                <ArrowLeftOutlined style={{ color: '#00aa98' }} onClick={this.onGoback} />
                <span>商品详情</span>
            </div>
        )
        return (
            <Card title={title}>
                <List>
                    <List.Item>
                        <h1>商品名称:</h1>
                        <span>{name}</span>
                    </List.Item>
                    <List.Item>
                        <h1>商品描述:</h1>
                        <span>{desc}</span>
                    </List.Item>
                    <List.Item>
                        <h1>商品价格:</h1>
                        <span>￥{price}</span>
                    </List.Item>
                    <List.Item>
                        <h1>所属分类:</h1>
                        <span>{this.state.name||"一级分类"}--&gt;{this.state.nameson}</span>
                    </List.Item>
                    <List.Item>
                        <h1>商品图片:</h1>
                        <div>
                            <img src={imgs[0].url} alt={imgs[0].name}></img>
                        </div>
                    </List.Item>
                    <List.Item>
                        <h1>商品详情:</h1>
                        <div dangerouslySetInnerHTML={{ __html: detail }} />
                    </List.Item>
                </List>
            </Card>
        )
    }
    reqId = async (categoryId) => {
        let result = await reqcatebyid(categoryId)
        if(result.status===0){
            this.setState({
                nameson:result.data.name
            })
        }
    }
    reqpId = async (categoryId) => {
        let result = await reqcatebyid(categoryId)
        if(result.status===0){
            this.setState({
                name:result.data.name
            })
        }
    }
    componentDidMount() {
        let id = this.props.location.state.item.categoryId
        let pid = this.props.location.state.item.pCategoryId
        if (pid === "0") {
            //没有父级分类，那就直接获取子分类
           this.reqId(id)
        } else {
            // 如果有父分类，就获取子分类，获取父分类
          this.reqId(id)
          this.reqpId(pid)
        }
    }
}