import React, { Component } from "react"
import "./login.css"
import {reqlogin} from "../../Api/index"
import memory from "../../util/memory"
import local from "../../util/local" 

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
let rules = [{ required: true, message: 'Please input your Username!' },
{max:14,message:"最大长度为14个字符"},
{min:4,message:"最小长度为4个字符"},
{pattern:/[a-zA-Z0-9]{4,14}$/,message:"用户名必须由字母数字来命名"},]
export default class Login extends Component {
    onFinish =async value => {
      let result=await reqlogin(value.username,value.password)
      console.log(result)
        //当登录成功的时候往内存中存储一份，往local中存储一份
        if(result.status===0){
            memory.user=result.data
            local.setStor(result.data)
            this.props.history.replace("/")
        }
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
      
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </div>
        )
    }
}