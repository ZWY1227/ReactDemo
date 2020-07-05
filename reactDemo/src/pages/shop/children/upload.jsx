import React from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {deleteImage} from "../../../Api/index"
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    })
  };

  handleChange = async({ file,fileList }) => {
    // console.log(fileList)
    this.setState({fileList})
    if(file.status==="done"){
     if(file.response.status===0){
      message.success("上传文件成功")
      let {name,url}=file.response.data
      file=fileList[0]
      file.name=name
      file.url=url
     }else{
       message.error("上传文件失败")
     }
    }else if(file.status==='removed'){
      let result=await deleteImage(file.name)
      if(result.status===0){
          message.success("删除图片成功")
      }else{
          message.error("删除文件失败")
      }
   
  }
}
  getfileList = () => {
    return this.state.fileList
  }

  render(){
    const { previewVisible, previewImage, fileList, previewTitle } = this.state
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"
          name="image"
          accept="image/*"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
  componentDidMount(){
    let fileList=this.props.pic
    this.setState({
      fileList
    })
  }
}


 