import React, { Component } from "react"
import "./login.css"

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
let rules = [{ required: true, message: 'Please input your Username!' },
{max:14,message:"最大长度为14个字符"},
{min:6,message:"最小长度为14个字符"},
{pattern:/[a-zA-Z0-9]{6,14}$/,message:"用户名必须由字母数字来命名"},]
export default class Login extends Component {
    onFinish = (value) => {
        console.log(value)
    }
    render() {
        return (
            <div className="index">
                <header className="hea">
                    <h1>后台管理系统</h1>
                </header>
                <section className="sec">
                    <div className="small">
                        <h1>用户登录</h1>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={rules}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>


                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
        </Button>
        Or <a href="">register now!</a>
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </div>
        )
    }
}