import React, { Component } from 'react';
import Clipboard from 'react-clipboard.js';

import { Table, Divider, message } from 'antd';
import SERVER_URL from './config'

class FileList extends Component {

  downloadFile = (filename)=>{
    this.props.downloadFile(filename)
  }

  deleteFile = (filename)=>{
    this.props.deleteFile(filename)
  }
  
  calSize = (b)=>{
    var kb = parseInt(b/1024);
    if(kb<=0) return b+'B';
    var mb = parseInt(kb/1024);
    if(mb<=0) return kb+'KB';
    var gb = parseInt(mb/2014);
    if(gb<=0) return mb+'MB'
  }

  calDate = (nS)=>{
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")   
  }

  displayClipMessage=()=>{
    message.success('copied to clipboard')
  }

  render() {
    const columns = [{
      title: 'Name',
      key: 'name',
      sorter: (a,b) => (a.name.length - b.name.length),
      render: file => <a href="javascript:void(0)" onClick={this.downloadFile.bind(this,file.name)}>{file.name}</a>,
    }, {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      sorter:(a,b) => (a.size - b.size),
      render:size => this.calSize(size)
    }, {
      title: 'UploadTime',
      dataIndex: 'time',
      key: 'time',
      sorter: (a, b) => (a.time - b.time),
      render: time => this.calDate(time)
    }, {
      title: 'Action',
      key: 'action',
      render: (file) => (
        <span>
          <a href="javascript:;" onClick={this.downloadFile.bind(this,file.name)}>Download</a>
          <Divider type="vertical" />
          <Clipboard 
            component="a" 
            button-href="javascript:;"
            data-clipboard-text={SERVER_URL+'/upload/'+file.name}
            onClick={this.displayClipMessage.bind(this)}
          >
            CopyLink
          </Clipboard>
          <Divider type="vertical" />
          {this.props.admin?<a href="javascript:;" onClick={this.deleteFile.bind(this,file.name)}>Delete</a>:null}
        </span>
      ),
    }];

    
    const data = this.props.data;
    return (
        <Table columns={columns} dataSource={data} />
    );
  }
}

export default FileList;

