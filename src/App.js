import React, { Component } from 'react';
import './App.css';
import { Layout,message } from 'antd';
import FileList from './FileList'
import UploadModal from './UploadModal'
import SERVER_URL from './config'

const {
  Header, Footer, Sider, Content,
} = Layout;


class App extends Component {

  constructor(props){
    super(props)
    this.state={
      files:[],
      maxSize:0
    }
  }

  syncFiles() {
    fetch(SERVER_URL+'/api/fileList.php',{
      method:'POST',
      mode:'cors'
    })
    .then(res =>res.json())
    .then((data) => {
      console.log(data)  
      this.setState({
        files:data.data,
        maxSize:data.maxSize,
      })
    })
  }

  deleteFile = (filename)=>{
    console.log("delete: "+filename)
    fetch(SERVER_URL+'/api/delete.php',{
      method:'POST',
      mode:'cors',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body:`filename=${filename}`
    })
    .then(res =>res.json())
    .then((data) => {
      console.log(data)  
      if(data.success) {
        message.success('delete success!')
        this.setState({files:data.data})
      } else {
        message.error('delete failed')
      }
    })
  }

  downloadFile = (filename)=>{
    window.open(SERVER_URL+'/upload/'+filename)
  }

  componentDidMount = ()=>{
    this.syncFiles();
  }

  updateFiles = (files)=>{
    this.setState({files:files})
  }
  
  render() {
    return (
      <Layout>
        <Header >
          <h2 style={{color:'white'}}>Share</h2>
        </Header>
        <Content>
          <UploadModal 
            className="App" 
            updateFiles={this.updateFiles.bind(this)}
            maxSize={this.state.maxSize}
          />
          <FileList 
            data={this.state.files} 
            deleteFile={this.deleteFile.bind(this)}
            downloadFile={this.downloadFile.bind(this)}
          />
        </Content>
        <Footer style={{textAlign:"left",position:'absolute',height:'70px',bottom:'0px',width:'100%'}}>
          By <a href="https://github.com/xuranus">XUranus</a>
        </Footer>
      </Layout>
    );
  }
}

export default App;