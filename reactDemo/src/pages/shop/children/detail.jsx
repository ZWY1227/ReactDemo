import React, { Component } from "react"
import { Card, List, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'
export default class Detail extends Component{
    state={
        name:"",
        nameson:""
    }
    onGoback = () => {
        console.log(this.props.history.goBack())
    }
    render(){
        console.log(this.product)
        let {name,desc,price,detail,imgs,_id,categoryId,pCategoryId}=this.props.location.query.item
        const title = (
            <div>
                <ArrowLeftOutlined style={{ color: '#00aa98' }} onClick={this.onGoback} />
                <span>商品详情</span>
            </div>
        )
        return(
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
                    <span>{this.state.name}--&gt;{this.state.nameson}</span>
                  </List.Item>
                 <List.Item>
                    <h1>商品图片:</h1>
                    <div>
                        <img src={imgs[0].url} alt={imgs[0]}></img>
                    </div>
                </List.Item>
                <List.Item>
                    <h1>商品详情:</h1>
                    <div dangerouslySetInnerHTML={{__html:detail}} />
                </List.Item>
            </List> 
        </Card>
        )
    }
    componentDidMount(){
    console.log(this.props.location.query.item)
    let id=this.props.location.query.item.categoryId
    let pid=this.props.location.query.item.pCategoryId
    if(pid!==0){
        //没有父级分类，那就直接获取子分类
    }else{
        //如果有父分类，就获取子分类，获取父分类
    }
    }
}