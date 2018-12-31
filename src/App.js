import React, { Component } from 'react';
import './App.css';
import { Layout,message } from 'antd';
import FileList from './FileList'
import UploadModal from './UploadModal'
import SERVER_URL from './config'
import Login from './LoginPanel'

const {
  Header, Footer, Content,
} = Layout;


class App extends Component {

  constructor(props){
    super(props)
    this.state={
      files:[],
      maxSize:0,
      admin:false,
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
        admin:data.admin
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
    
    var token = this.getCookie('token');
    if(token!==undefined && token!==null) {
      this.tokenAuth(token);
    }
  }

  setCookie = (name,value)=>{ 
    var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
  }
  
  getCookie = (name)=>{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]); 
    else 
        return null; 
  } 


  updateFiles = (files)=>{
    this.setState({files:files})
  }

  tokenAuth = (token)=>{
    fetch(SERVER_URL+'/api/auth.php',{
      method:'POST',
      mode:'cors',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body:`token=${token}`
    })
    .then(res =>res.json())
    .then((data) => {
      console.log(data)  
      if(data.success) {
        message.success('you are admin!')
        this.setCookie('token',data.yourtoken)
        this.setState({admin:true})
      } else {
        message.error('token error!')
      }
    })
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
            admin = {this.state.admin}
            data={this.state.files} 
            deleteFile={this.deleteFile.bind(this)}
            downloadFile={this.downloadFile.bind(this)}
          />
        </Content>
        <Footer style={{textAlign:"left",position:'absolute',height:'70px',bottom:'0px',width:'100%'}}>
          Author: <a href="https://github.com/xuranus">XUranus </a>,
            &nbsp;Powered By &nbsp;
           <a href="https://ant.design/">Ant Design</a>.&nbsp;&nbsp;
           {this.state.admin?null:<Login tokenAuth={this.tokenAuth.bind(this)}/>}
        </Footer>
      </Layout>
    );
  }
}

export default App;