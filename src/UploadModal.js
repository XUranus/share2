import { Modal, Button } from 'antd';
import React, { Component } from 'react';
import UploadDragger from './UploadDragger'


class UploadModal extends React.Component {
  state = {
    ModalText: 'file max size 100M',
    visible: false,
    confirmLoading: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <div style={{margin:10,textAlign:'center'}}>
        <Button type="primary" onClick={this.showModal}>
          Select File
        </Button>
        &nbsp;&nbsp;&nbsp;
        Max File Size: <span>{this.props.maxSize}</span>
        </div>
        <Modal
          title="Upload"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
        <UploadDragger updateFiles={this.props.updateFiles.bind(this)}/>
        </Modal>
      </div>
    );
  }
    
}

export default UploadModal