import React, { Component } from "react"
import LinkButton from "../../components/Button/Button"
import { showUse, addUse, deleteUse, updateUse } from "../../Api/index"
import { Card, Button, Table, Modal, Input, Form, Select, message, ConfigProvider, Tree } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import filterTime from "../../util/filter_fun"
const { Option } = Select
export default class User extends Component {
    state = {
        dataSource: [],
        roleList: [],
        visible: false,
        username: "",//默认用户名
        phone: "",//默认手机号
        email: "",//默认邮箱
        role_id:"0",//默认角色
        _id: "",//用户id
    }
    showModle = () => {
        this.setState({
            visible: true
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
        this.setState({
            username: "",//默认用户名
            phone: "",//默认手机号
            email: "",//默认邮箱
            role_id:"0",//默认角色
            _id: ""//用户id
        })
    }
    addOK = async (e) => {
        let { username, password, phone, email, role_id } = e
        let { _id } = this.state
        let result
        if (_id !== "") {
            result = await updateUse(_id,username,phone,email,role_id)
        } else {
            result = await addUse(username, password, phone, email, role_id)
        }
        if (result.status === 0) {
            this.setState({
                username: "",//默认用户名
                phone: "",//默认手机号
                email: "",//默认邮箱
                role_id:"0",//默认角色
                _id: ""//用户id
            })
            message.success(_id === ""?"添加用户成功":"编辑用户成功")
            this.reqUser()
        } else {
            message.error(_id === ""?"添加用户失败":"编辑用户失败")
        }
        this.setState({
            visible: false
        })
    }
    del = async (userId) => {
        let result = await deleteUse(userId)
        if (result.status === 0) {
            Modal.confirm({
                title: "小提示",
                content: "你确定要删除该用户吗？",
                onOk: () => {
                    message.success("删除用户成功")
                    this.reqUser()
                }
            })
        } else {
            message.error("删除用户失败")
        }
    }
    //点击编辑按钮后就把该行的信息存到state中
    edit = (items) => {
        this.setState({
            visible: true,
            username: items.username,//默认用户名
            phone: items.phone,//默认手机号
            email: items.email,//默认邮箱
            role_id: items.role_id,//默认角色
            _id: items._id//用户id
        })

    }
    //初始化表头
    initColumn = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: (create_time) => {
                    return filterTime(create_time)

                }
            },
            {
                title: '所属角色',
                dataIndex: 'role',
            },
            {
                title: '操作',
                render: items => {
                    return (
                        <span>
                            <LinkButton onClick={() => { this.edit(items) }}>修改</LinkButton>
                            <LinkButton onClick={() => { this.del(items._id) }}>删除</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }
    onGenderChange=(e)=>{
        console.log(e)
        this.setState({
            role_id:e
        })
    }
    render() {
        const { roleList, visible, username, phone, email, role_id, abs } = this.state
        let title = (
            <span>
                <Button type='primary' onClick={this.showModle}>
                    <PlusOutlined />
            添加</Button>
            </span>
        )
        return (
            <Card type="inner" title={title}>
                <Table dataSource={this.state.dataSource} columns={this.columns} bordered pagination={{ showQuickJumper: true, pageSize: 3 }} />
                <Modal
                    title={username ? "修改用户" : "添加用户"}
                    visible={visible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        onFinish={this.addOK}
                        hideRequiredMark='true'
                    >
                        <Form.Item label="用户名称" name="username" initialValue={['']} rules={[{ required: true, message: 'Please input your name!' }]}>
                            <Input placeholder="请输入用户名称"/>
                        </Form.Item>
                        {username ? "" : <Form.Item label="密码" name="password" initialValue={['']} rules={[{ required: true, message: 'Please input your Password!' }]}>
                            <Input placeholder="请输入密码" />
                        </Form.Item>}
                        <Form.Item label="手机号" name="phone" initialValue={['']} rules={[{ required: true, message: 'Please input your phone!' }]}>
                            <Input placeholder="请输入手机号" />
                        </Form.Item>
                        <Form.Item label="邮箱" name='email' initialValue={['']} rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input placeholder="请输入邮箱号" />
                        </Form.Item>
                        <Form.Item label="角色" name="role_id" initialValue={[username?this.state.role_id:"0"]} rules={[{ required: true, message: 'Please select!' }]}>
                            <Select onChange={this.onGenderChange} allowClear>
                            <Option value="0">请选择角色</Option>
                                {
                                    roleList.map(item => {
                                        return (
                                            <Option value={item.key} key={item.key}>{item.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item style={{ textAlign: "right" }}>
                            <Button style={{ marginRight: 30 }} onClick={this.handleCancel}>取消</Button>
                            <Button type="primary" htmlType='submit'>确定</Button>
                        </Form.Item>
                    </Form>

                </Modal>
            </Card>
        )
    }
    reqUser = async () => {
        let result = await showUse()
        if (result.status === 0) {
            result.data.users.map(item => {
                item.key = item._id
                result.data.roles.map(items => {
                    items.key = items._id
                    if (item.role_id === items._id) {
                        item.role = items.name
                    }
                })
            })
            this.setState({
                dataSource: result.data.users,
                roleList: result.data.roles
            })
        }


    }
    componentDidMount() {
        this.reqUser()
    }
    componentWillMount() {
        this.initColumn()
    }
}