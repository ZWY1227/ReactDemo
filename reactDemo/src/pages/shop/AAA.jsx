import React, { Component } from "react"
import { Card, Button, Table, message } from 'antd';
import { PlusOutlined } from "@ant-design/icons"
import LinkButton from "../../components/Button/Button"
import {reqCategorys} from "../../Api/index"
export default class One extends Component {
    state={
        isLogin:false,
        columns:[],
        dataSource:[]
    }
    initCate=()=>{
        const columns=[
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: () => {
                    return (
                        <span>
                            <LinkButton>修改分类</LinkButton>
                            <LinkButton>查看子分类</LinkButton>
                        </span>
                    )
                }
            }
        ]
        this.setState({columns})
    }
    getCate=async ()=>{
        this.state.isLogin=true
        let result=await reqCategorys("1")
        console.log(result)
        if(result.status===0){
            this.state.isLogin=false
            message.success("获取分类信息成功")
        }else{
            this.state.isLogin=false
            message.error("获取分类信息失败")
        }
    }
    render() {
        let {isLogin,columns,dataSource}=this.state
        let title = "一级列表"
        let extra = (
            <Button type='primary' onClick={this.showAdd}>
                <PlusOutlined />添加
            </Button>
        )
        // const dataSource = [
        //     {
        //         name: '胡彦斌',
        //         key:"0"
        //     },
        //     {
        //         name: '胡彦祖',
        //         key:"1"
        //     },
        // ];
        return (
            <Card type="inner" title={title} extra={extra}>
                <Table
                    loading={isLogin}
                    dataSource={dataSource}
                    columns={columns}
                    bordered
                    pagination={{defaultPageSize:5,showQuickJumper:true}}
                />
            </Card>
        )
    }
   componentWillMount(){
    this.initCate()
   }
   componentDidMount(){
       this.getCate()
   }

}