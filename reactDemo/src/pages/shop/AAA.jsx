import React, { Component, useState } from "react"
import { Card, Modal, Button, Table, message, Form, Input, Select } from 'antd';
import { PlusOutlined } from "@ant-design/icons"


import LinkButton from "../../components/Button/Button"
import { reqCategorys, reqAddCategory,reqAddCategoryT } from "../../Api/index"

export default class One extends Component {
    state = {
        isLogin: false,//获取接口loading
        columns: [],
        value: [],
        loading: false,//添加数据确定时的loading
        visible: false,//弹出框是否可见，点击添加按钮的时候可见
        sel:"一级分类",
        visibleUp:false
    }
    //关于input和select的操作

    //点击添加弹出添加的弹出框
    clickHandle = () => {
        this.setState({
            visible: true,
        });
    }
    //添加框里的确定，取消触发的事件
    handleOk = async () => {
        //如果选择的是1级分类就添加1级分类，
        let sel=this.state.sel
        let value=this.state.value
        let r= value.find(item=>item.name===sel)
        if(sel==="一级分类"){
            let one = this.refs.abc.state.value
            console.log(one)
            //发送请求，来添加一级分类，发送请求的时候需要拿到input框的值
            let result = await reqAddCategory(one)
            if (result.status === 0) {
                console.log(result)
                message.success("添加一级分类成功了")
                this.getCate()
            } else {
                message.error("添加出错")
            }
        }else{
            //如果选择的是1级分类的名称就添加二级分类，发送请求的时候需要拿到input框的值和父的id
            let one = this.refs.abc.state.value
            console.log(one,r.key)//这里拿到的是input框的二级分类名称和对应的一级分类的id
           let result=await reqAddCategoryT(r.key,one)
           console.log(result)
           if(result.status===0){
               message.success("添加二级分类成功")
           }else{
               message.error("添加二级分类失败")
           }

        }
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 1000);
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    // 点击编辑时做的事项，打开model
    editFun = () => {
        console.log("修改分类")
        this.setState({
            visibleUp: true,
        });
    }
    upOk=()=>{
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visibleUp: false });
        }, 1000);
    }
    upCancle=()=>{
        this.setState({ loading: false, visibleUp: false });
    }
    // 查看子分类做的事情
    showFun = (e) => {
        console.log("查看子分类")
    }
    //初始化分类名称和操作
    initCate = () => {
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                key: 'name',
                title: '操作',
                width: 300,
                render: () => {
                    return (
                        <span>
                            <LinkButton onClick={this.editFun}>修改分类</LinkButton>
                            <LinkButton onClick={this.showFun}>查看子分类</LinkButton>
                        </span>
                    )
                }
            }
        ]
        this.setState({ columns })
    }
    //调用获取一级列表数据的接口并渲染到页面上去
    getCate = async () => {
        let isLogin = true
        this.setState({
            isLogin
        })
        let result = await reqCategorys()
        console.log(result)
        if (result.status === 0) {
            let a = []//定义空数组用来拿到改变结构后的数据源
            //1，遍历出每一个一级分类的名称和——id
            console.log(result)
            let value = result.data.map(item =>{return({ name:item.name,parentId:item._id})})
            //2，a里面push改变好数据结构的每一个每类数据
            value.forEach((items, index) => { return a.push({ name: items.name, key:items. parentId }) })
            //关闭loading
            let isLogin = false
            //3，覆盖原来的value，最后给需要数据源的datasource赋值
            this.setState({
                value: Object.assign([], ...this.state.value, a),
                isLogin
            })
            message.success("获取分类信息成功")
        } else {
            this.state.isLogin = false
            message.error("获取分类信息失败")
            let isLogin = false
            this.setState({
                isLogin
            })
        }
    }
    //改变select的值
    setsel=(e)=>{
        console.log(e)
        this.setState({
            sel:e
        })
    }
    render() {
        let { isLogin, columns, loading, visible,sel,visibleUp } = this.state
        let {setsel}=this
        let title = "一级分类列表"
        let extra = (
            <Button type='primary' onClick={this.showAdd}>
                <PlusOutlined onClick={this.clickHandle} />添加
            </Button>
        )
        return (
            <div>
                {/* 这是点击添加后的弹出框哦 */}
                <div>
                    <Modal
                        visible={visible}
                        title="添加分类"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}> Return</Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}> Submit </Button>,
                        ]}
                    >
                        {/* 这是select和input框 */}
                        <Form.Item>
                            <Select value={sel} onChange={setsel}>
                                {
                                    this.state.value.map(item => {
                                        return (
                                            <Select.Option key={item.key} value={item.name} >{item.name}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Input ref="abc" />
                        </Form.Item>
                    </Modal>
                </div>
                {/*这是点击编辑分类时弹出的框 */}
                <div>
                    <Modal
                        visible={visibleUp}
                        title="编辑分类"
                        onOk={this.upOk}
                        onCancel={this.upCancle}
                        footer={[
                            <Button key="back" onClick={this.upCancle}> Return</Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={this.upOk}> Submit </Button>,
                        ]}
                    >
                        {/*input框 */}
                        <Form.Item>
                            <Input ref="abc" />
                        </Form.Item>
                    </Modal>
                </div>
                <Card type="inner" title={title} extra={extra}>
                    <Table
                        loading={isLogin}
                        dataSource={this.state.value}
                        columns={columns}
                        bordered
                        pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                    />
                </Card>
            </div>

        )
    }
    componentWillMount() {
        this.initCate()
    }
    componentDidMount() {
        this.getCate()
    }

}