import React, { Component } from "react"
import { Card, Button, Table, Modal, Input, Form, Select, message, Tree } from 'antd';
import { reqRole, reqRoleList, updataRole } from "../../Api/index"
import filterTime from "../../util/filter_fun"
import menuList from "../../config/menuConfig"
import memory from "../../util/memory"
export default class Role extends Component {
    constructor(props) {
        super(props)
        this.myref = React.createRef()
        this.myref2 = React.createRef()
    }
    state = {
        ischecked: true,
        dataSource: [],
        totle: 0,
        visible: false,
        visible2: false,
        confirmLoading: false,
        input: "",
        checkName: "",
        treeData: [],
        _id:"",
        menus:[],
        auth_time:Date.now(),
    }
    initColumn = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render: (auth_time) => {
                    return auth_time ? filterTime(auth_time) : ""
                }
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
            }]
    }
    handleOk = async () => {
        let inputName = this.myref.current.props.value
        let result = await reqRole(inputName)
        if (result.status === 0) {
            message.success("添加角色成功")
            this.reqRoleList()
        } else {
            message.error("添加角色失败")
        }
        console.log(result)
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };
    handleOk2 = async() => {
        let {_id,menus,auth_time}=this.state
        // console.log(_id,menus,auth_time,memory.user.username)
        let result=await updataRole(_id,menus,auth_time,memory.user.username)
        console.log(result)
        if(result.status===0){
            message.success("设置权限成功")
            this.reqRoleList()
        }else{
            message.error("设置权限失败")
        }
        this.setState({
            visible2: false
        });
    }
    handleCancel2 = () => {
        this.setState({
            visible2: false,
        });
    };
    changeInput = (e) => {
        this.setState({
            input: e.target.value
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    showModal2 = () => {
        this.setState({
            visible2: true,
        });
    }
    onCheck = (e) => { 
        this.setState({
            menus:e
        })
     }
    render() {
        const { visible, visible2, confirmLoading } = this.state;
        let title = (
            <div>
                <Button type="primary" style={{ marginRight: 15 }} onClick={this.showModal}>添加角色</Button>
                <Button type="primary" disabled={this.state.ischecked} onClick={this.showModal2}>设置角色</Button>
            </div>
        )
        return (
            <Card type="inner" title={title}>
                <Table
                    dataSource={this.state.dataSource}
                    columns={this.columns}
                    rowSelection={{ type: 'radio', onSelect: this.oneselect }}
                    pagination={{ total: this.state.totle, defaultPageSize: 3 }}

                />
                {/* 添加角色 */}
                <Modal
                    title="添加角色"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Form labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal">
                        <Form.Item label="角色名称" required>
                            <Input ref={this.myref} value={this.state.input} placeholder="请输入角色名称" onChange={this.changeInput} />
                        </Form.Item>
                    </Form>
                </Modal>
                {/* 设置角色 */}
                <Modal
                    title="设置角色权限"
                    visible={visible2}
                    onOk={this.handleOk2}
                    onCancel={this.handleCancel2}
                >
                    <Form labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal">
                        <Form.Item label="角色名称">
                            <Input ref={this.myref2} disabled={true} placeholder={this.state.checkName} />
                        </Form.Item>
                    </Form>
                    <Tree
                        checkable
                        onCheck={this.onCheck}
                        treeData={this.state.treeData}
                        defaultExpandAll='true'
                    />
                </Modal>
            </Card>
        )
    }
    oneselect = (e) => {
        this.setState({
            ischecked: false,
            checkName: e.name,
            _id:e.key
        })
    }
    reqRoleList = async () => {
        let result = await reqRoleList()
        let totle = result.data.length
        if (result.status === 0) {
            console.log(result)
            let dataSource = result.data.map(item => {
                return { key: item._id, name: item.name, create_time: filterTime(item.create_time), auth_time: item.auth_time, auth_name: item.auth_name || "" }
            })
            this.setState({
                dataSource,
                totle,
            })
        }
    }
    componentWillMount() {
        this.initColumn()
        this.reqRoleList()
    }
    componentDidMount(){
        this.setState({
            treeData:[{title:"平台权限",key:"平台权限",children:menuList}]
        })
    }
}