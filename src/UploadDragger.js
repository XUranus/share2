import { Upload, Icon, message } from 'antd';
import React, { Component } from 'react';
import SERVER_URL from './config'
const Dragger = Upload.Dragger;

class UploadDragger extends React.Component {
    
    render() {

        const _this = this;

        const props = {
            name: 'file',
            multiple: true,
            action: SERVER_URL+'/api/upload.php',
            onChange(info) {
                console.log('upload:',info)
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    var res = info.file.response;
                    if(res.success) {
                        message.success(`${info.file.name} file uploaded successfully.`);
                        _this.props.updateFiles(res.data);
                    } else {
                        message.error(`failed: ${res.msg}`);
                    }
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        return(
            <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
            </Dragger>
        );
        }
}

export default UploadDragger