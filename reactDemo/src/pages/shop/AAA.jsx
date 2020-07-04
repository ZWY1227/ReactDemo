import React, { Component } from "react"
import { Card, Modal, Button, Table, message, Form, Input, Select } from 'antd';
import { PlusOutlined } from "@ant-design/icons"


import LinkButton from "../../components/Button/Button"
import { reqCategorys, reqAddCategory, reqAddCategoryT, reqUpdateCategory } from "../../Api/index"

export default class One extends Component {
    state = {
        isLogin: false,//获取接口loading
        columns: [],
        value: [],
        loading: false,//添加数据确定时的loading
        visible: false,//弹出框是否可见，点击添加按钮的时候可见
        parentId: "0",//请求接口的参数，也是页面渲染关键之处
        dataSource: [],//拿到一级分类的数据
        twodataSource: [],//拿到二级分类的数据
        cateName: ""//一级分类的名称
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
        let one = this.refs.abc.state.value
        let { parentId } = this.state
        if (parentId === "0") {
            //发送请求，来添加一级分类，发送请求的时候需要拿到input框的值
            let result = await reqAddCategory(one)
            if (result.status === 0) {
                console.log(result, "一级分类")
                message.success("添加一级分类成功了")
                this.getCate()
            } else {
                message.error("添加出错")
            }
        } else {
            //如果选择的是1级分类的名称就添加二级分类，发送请求的时候需要拿到input框的值和父的id
            let result = await reqAddCategoryT(this.state.parentId, one)
            console.log(result, "二级")
            if (result.status === 0) {
                this.setState({
                    parentId:"0"
                },()=>{
                    this.getCate()
                })
               
                message.success("添加二级分类成功")

                
            } else {
                message.error("添加二级分类失败")
            }
        }
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 1000);
        this.refs.abc.state.value = ""
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    // 点击编辑时做的事项，打开model
    editFun = (name, id) => {
        console.log("修改分类", name, id)
        this.setState({
            visibleUp: true,
            cateName: name,
            parentId: id
        });
    }
    upOk = async () => {
        let name = this.refs.xxx.state.value
        let { parentId } = this.state
        this.setState({ loading: true });
        let result = await reqUpdateCategory(parentId, name)
        console.log(result, "更新成功了")
        this.setState({
            parentId:"0"
        },()=>{
            this.getCate() 
        })
      

        setTimeout(() => {
            this.setState({ loading: false, visibleUp: false });
        }, 1000);
    }
    upCancle = () => {
        this.setState({ loading: false, visibleUp: false });
    }
    // 查看子分类做的事情
    showFun = (name, id) => {
        console.log("查看子分类", name, id)
        this.setState({
            parentId: id,
            cateName: name
        }, () => {
            this.getCate()
        })
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
                title: '操作',
                width: 300,
                render: (item) => {
                    let name = item.name
                    let id = item._id
                    //    console.log(name,id)
                    return (
                        <span>
                            <LinkButton onClick={() => { this.editFun(name, id) }}>修改分类</LinkButton>
                            <LinkButton onClick={() => { this.showFun(name, id) }}>查看子分类</LinkButton>
                        </span>
                    )
                }
            }
        ]
        this.setState({ columns })
    }
    //调用获取一级列表数据的接口并渲染到页面上去
    getCate = async () => {
        let id = this.state.parentId
        let isLogin = true
        this.setState({
            isLogin
        })
        let result = await reqCategorys(id)
        if (result.status === 0) {
            //1，遍历出每一个分类，添加属性key
            result.data.forEach(item => { item.key = item._id })
            //关闭loading
            let isLogin = false
            this.setState({
                isLogin
            })
            if (id === "0") {
                message.success("获取一级分类信息成功")
                this.setState({ dataSource: result.data })
            } else {
                message.success("获取二级分类信息成功")
                this.setState({ twodataSource: result.data })
            }
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
    setsel = (e) => {
        console.log(e)
        this.setState({
            parentId: e
        })
    }
    //改变input
    setCate = (e) => {
        let cateName = e.target.value
        this.setState({
            cateName
        })
    }
    //点击nav的导航一级列表，清空cataName,重置prentId为0

    goOne = () => {
        this.setState({
            cateName:"",
            parentId:"0"
        },()=>{
            this.getCate()
        })
    }
    render() {
        let { isLogin, columns, visible, visibleUp, parentId, dataSource, twodataSource, cateName } = this.state

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
                    >
                        {/* 这是select和input框 */}
                        <Form.Item>
                            <Select value={parentId === "0" ? "0" : parentId} onChange={this.setsel}>
                                <Select.Option key="0" value="0" >一级分类</Select.Option>
                                {
                                    dataSource.map(item => {
                                        return (
                                            <Select.Option key={item._id} value={item._id} >{item.name}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Input ref="abc" placeholder="请输入分类名称" />
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
                    >
                        {/*input框 */}
                        <Form.Item>
                            <Input ref="xxx" value={cateName} onChange={this.setCate} />
                        </Form.Item>
                    </Modal>
                </div>
                <Card type="inner"


                    title={parentId === "0" ? <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一级分类列表</span> : (<span><LinkButton onClick={this.goOne}>一级分类列表---&gt;</LinkButton><span>{this.state.cateName}</span></span>)}
                    extra={extra}>
                    <Table
                        loading={isLogin}
                        dataSource={parentId === "0" ? dataSource : twodataSource}
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