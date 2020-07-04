import React, { Component } from "react"
import { Card, Table, message, Form, Input, Select, Button } from 'antd';
import { PASE_SIZE } from "../../../util/pageSize"//每页条数
import { reqshopList, searchShop } from "../../../Api/index"
import { PlusOutlined } from "@ant-design/icons"
import LinkButton from "../../../components/Button/Button"
const { Option } = Select;
export default class Show extends Component {
  state = {
    dataSource: [],
    columns: [],
    product: 'productName',//select
    inputcontent: "",//input
    total: ""
  }
  Select = (e) => {
    this.setState({
      product: e
    })
  }
  input = (e) => {
    this.setState({
      inputcontent: e.target.value
    })
    if (e.target.value === "") {
      this.inintdateSouce(1)
    }
  }
  myref = React.createRef()
  search = async () => {
    let productType = this.state.product
    let content = this.state.inputcontent
    let result = await searchShop(1, PASE_SIZE, productType, content)
    console.log("!@#$",result)
    if (result.status === 0) {
      console.log(result.data.list)
      result.data.list.forEach(item => item.key = item._id)
      this.setState({
        dataSource: result.data.list
      })
    }
  }
  render() {
    let { dataSource, columns, product, total } = this.state
    let title = (
      <div>
        <Select style={{ width: 140, margin: '0 8px' }} value={product} onChange={this.Select}>
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按关键字搜索</Option>
        </Select>
        <Input type="text" style={{ width: 100 }} ref="myref" onChange={this.input} />
        <Button type="primary" onClick={this.search}>搜索</Button>
      </div>
    )
    let extra = (
      <Button type='primary' onClick={this.showAdd}>
        <PlusOutlined onClick={this.goadd} />添加
      </Button>
    )
    return (
      <div>
        <Card type="inner" title={title} extra={extra}>
          <Table
            pagination={{
              total,
              defaultPageSize: PASE_SIZE,
              showQuickJumper: true,
              onChange: this.inintdateSouce,
              disabled: false
            }} dataSource={dataSource} columns={columns} bordered />
        </Card>
      </div>
    )
  }
  inintdateSouce = async (pageNum) => {
    let result = await reqshopList(pageNum, PASE_SIZE)
    if (result.status === 0) {
      message.success("访问接口成功")
      result.data.list.forEach(item => item.key = item._id)
      this.setState({
        dataSource: result.data.list,
        total: result.data.total
      })
    } else {
      message.error("访问分页商品出错")
    }
  }
  goadd = () => {
    this.props.history.replace("/admin/shop/two/add")
  }
  goDetail = (item) => {
    this.props.history.push({pathname:"/admin/shop/two/detail",query:{item}})
  }
  goedit = (item) => {
    this.props.history.push({pathname:"/admin/shop/two/add",query:{item}})
  }
  initcolumns = () => {
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '商品价格',
        dataIndex: 'price'
      },
      {
        title: '商品状态',
        render: () => {
          return (
            <span>
              <Button type='primary'>下架</Button>
              <p>在售</p>
            </span>
          )
        }
      },
      {
        title: '操作',
        render: (item) => {
          // console.log(item)
          return (
            <div>
              <LinkButton onClick={()=>{this.goDetail(item)}}>详情</LinkButton>
              <LinkButton onClick={()=>this.goedit(item)}>编辑</LinkButton>
            </div>
          )
        }
      },
    ];
    this.setState({
      columns
    })
  }
  componentWillMount() {
    this.initcolumns()
  }
  componentDidMount() {
    //当页面挂载完毕的时候来拿到数据库中的商品，调用接口，给表格的datasource赋值
    this.inintdateSouce(1)
  }
}