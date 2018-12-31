import { Modal, Input } from 'antd';
import React from 'react';


class LoginPanel extends React.Component {
  state = {
    ModalText: 'file max size 100M',
    visible: false,
    confirmLoading: false,
    input:'',
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    const token = this.state.input;
    this.props.tokenAuth(token);
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

  handleInputChange = (e)=>{
      this.setState({input:e.target.value})
  }

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <span>
        <a href="javascript:;" onClick={this.showModal}>Login</a>
        <Modal
          title="Admin Login"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
        <Input onChange={this.handleInputChange.bind(this)} placeholder="input admin token" ref="tokenInput"/>
        </Modal>
      </span>
    );
  }
    
}

export default LoginPanel