/**
 *  原作者：harry.lang
 *  完善者：Abbott.liu
 *  日期：2017/11/01
 *  作用：创建大屏功能
 */
import React from 'react';
import { Modal, Button, Form, Input, Row, Col } from 'antd';

const FormItem = Form.Item;

class CreateScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            templates: [{
                className: 'network-health-template',
                title: '网络健康状态'
            }],
            currentTemplate: ''
        };
    }

    showModal(e, item, type) {
        // 终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播
        e.stopPropagation();
        // 该方法将通知 Web 浏览器不要执行与事件关联的默认动作
        e.preventDefault();
        //设置展示
        this.props.handleSetModalVisiable({visible: true, mode: type});
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 17}
        };

        let { getFieldDecorator } = this.props.form || [];

        const visible = this.props.visible || [];

        //本地存储的大屏模板列表
        //const screenTemplates = ENV.screen.model || [];
        //服务端取回来的大屏模板列表
        //const templates = this.props.templates || [];
        //默认模板图片
        //const defaultTemplateImg = ENV.screen.modelImagePath + '/template.png';

        //const intl = this.props.intl || {};

        return <span>
            <Button type="green">创建大屏</Button>
            <Modal className="create-screen-modal ant-modal-dark"
                   visible={visible.visible}
                   footer={null}
                   title={ "手动创建大屏" }
            >

            </Modal>
        </span>

    }
}

export default CreateScreen;
