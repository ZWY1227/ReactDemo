import React, { Component } from "react"
import Editor from 'react-umeditor'
import PicturesWall from "./upload"
import { Card, message } from 'antd';
import { Form, Input, Button, Cascader } from 'antd';
import { reqCategorys, addUpdata } from '../../../Api/index'
import { ArrowLeftOutlined } from '@ant-design/icons'

export default class Add extends Component {
    constructor(props) {
        super(props)
        this.myref = React.createRef()
    }
    // 富文本编辑器的代码==
    getIcons() {
        var icons = [
            "source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
            "paragraph fontfamily fontsize | superscript subscript | ",
            "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
            "cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
            "horizontal date time  | image emotion spechars | inserttable"
        ]
        return icons;
    }
    getQiniuUploader() {
        return {
            url: 'http://upload.qiniu.com',
            type: 'qiniu',
            name: "file",
            request: "image_src",
            qiniu: {
                app: {
                    Bucket: "liuhong1happy",
                    AK: "l9vEBNTqrz7H03S-SC0qxNWmf0K8amqP6MeYHNni",
                    SK: "eizTTxuA0Kq1YSe2SRdOexJ-tjwGpRnzztsSrLKj"
                },
                domain: "http://o9sa2vijj.bkt.clouddn.com",
                genKey: function (options) {
                    return options.file.type + "-" + options.file.size + "-" + options.file.lastModifiedDate.valueOf() + "-" + new Date().valueOf() + "-" + options.file.name;
                }
            }
        }
    }
    //富文本结束
    state = {
        loading: false,
        content: "",
        options: [],
        firstId: '',
        pCategoryId: "",//父Id
        categoryId: "",//二级分类Id
        newFileList: []
    }
    cascaderChange = (e) => {
        if (e.length <= 1) {
            console.log(e, "没有父级，自己添加0")
            this.setState({
                pCategoryId: "0",
                categoryId: e[0]
            })
        } else {
            console.log(e, "有父级和子级更新两个状态")
            this.setState({
                pCategoryId: e[0],
                categoryId: e[1]
            })
        }
    }
    //点击添加的完成按钮
    finishsubmit = async (e) => {
        let { content, pCategoryId, categoryId } = this.state//富文本，父id,子id
        //e表单里面的数据 name，desc，price
        let { name, desc, price } = e
        let imgs = this.myref.current.getfileList()//图片数组
        let result
        if (this.isedit) {
            let { _id } = this.product//商品id，编辑时的该商品
            let productedit = { categoryId, pCategoryId, name, desc, price, detail: content, imgs, _id }
            result = await addUpdata(productedit)
            console.log(result, "编辑后点击提交的结果")
            this.props.history.replace("/admin/shop/two/show")
        } else {
            let productadd = { categoryId, pCategoryId, name, desc, price, detail: content, imgs }
            result = await addUpdata(productadd)
            console.log(result, "添加后点击提交的结果")
            this.props.history.replace("/admin/shop/two/show")
        }
    }
    editorsfun = (e) => {
        this.setState({
            content: e
        })
    }
    onGoback = () => {
        this.props.history.goBack()
    }
    render() {

        var icons = this.getIcons();
        var uploader = this.getQiniuUploader();
        var plugins = {
            image: {
                uploader: uploader
            }
        }
        var count = 100;
        var editors = [];
        for (var i = 0; i < count; i++) {
            editors.push({
                icons: icons,
                plugins: plugins
            })
        }
        let { product, isedit } = this
        let { name, desc, price, detail, imgs, pCategoryId, categoryId, _id } = product
        let title = (
            <div onClick={this.onGoback}>
                <ArrowLeftOutlined style={{ color: '#00aa98' }} />
                {isedit ? "编辑商品" : "添加商品"}
            </div>
        )

        let { options } = this.state
        return (
            <Card title={title} style={{ height: 710 }}>
                <Form name="dynamic_rule" onFinish={this.finishsubmit} style={{ height: 360 }}>
                    <Form.Item
                        name="name"
                        label="商品名称"
                        required='true'
                        initialValue={isedit ? name : ""}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="商品描述" required='true' name="desc"
                        initialValue={isedit ? desc : ""}
                    >
                        <Input.TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 2 }} />
                    </Form.Item>

                    <Form.Item label="商品价格" required='true' name="price"
                        initialValue={isedit ? price : ""}
                    >
                        <Input addonAfter="元" />
                    </Form.Item>

                    <Form.Item label="商品分类" required='true' name="cate" value={[pCategoryId, categoryId]} initialValue={isedit ? [pCategoryId, categoryId] : ['请选择分类']}>
                        <Cascader
                            options={options}
                            expandTrigger="click"
                            onChange={this.cascaderChange}
                        />
                    </Form.Item>
                    {/* 上传图片 */}
                    <Form.Item label="上传照片">
                        <PicturesWall pic={isedit ? imgs : ""} ref={this.myref}></PicturesWall>
                    </Form.Item>
                    <Form.Item style={{ position: "absolute", bottom: 0 }}>
                        <Button type="primary" htmlType='submit'>提交</Button>
                    </Form.Item>
                </Form>
                <h4>商品详情：</h4>
                <Editor ref="editor"
                    icons={icons}
                    value={this.state.content}
                    onChange={this.editorsfun}
                    plugins={plugins}
                    defaultValue={isedit ? detail : ""}
                />
            </Card>
        )
    }
    componentWillMount() {
        if (this.props.location.state) {//编辑页面过来
            let product = this.props.location.state.item
            this.isedit = !!product
            this.product = product
        } else {//添加页面过来的
            this.product = {}
            this.isedit = ""
        }
        this.getCategroyList()
    }
    getCategroyList = async () => {
        let res = await reqCategorys("0")
        if (res.status === 0) {
            let firstList = res.data.map((item) => {
                return { value: item._id, label: item.name }
            })
            firstList.map(async (items) => {
                let result = await reqCategorys(items.value)
                if (result.status === 0) {
                    if (result.data.length) {
                        items.children = result.data.map((data) => {
                            return {
                                value: data._id,
                                label: data.name
                            }
                        })
                    }
                }
                this.setState({
                    options: firstList
                })
            })

        }
    }
}