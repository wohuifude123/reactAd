import { Modal, Button } from 'antd';
import React, { Component } from 'react';

class ModalCustom extends React.Component {
    state = {
        loading: false,
        visible: false,
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    render() {
        const { visible, loading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Open
                </Button>
                <Modal
                    visible={visible}
                    title="Title"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" size="large" onClick={this.handleCancel}>Return</Button>,
                        <Button key="submit" type="primary" size="large" loading={loading} onClick={this.handleOk}>
                            Submit
                        </Button>,
                    ]}
                >
                    <p>我的世界里</p>
                    <p>你的</p>
                    <p>孩子</p>
                    <p>横向你</p>
                    <p>纵向</p>
                </Modal>
            </div>
        );
    }
}

export default ModalCustom;


