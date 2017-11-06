import { Layout, Menu, Breadcrumb, Icon, Modal } from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Initialization.css'

import favicon from '../images/favicon.ico';

import CreateScreen from '../routers/CreateScreen/CreateScreen';

const { Header, Content, Footer, Sider } = Layout;
/**
 *  作者：Abbott.liu
 *  日期：2017/11/02
 *  作用：初始化大屏的菜单
 */
class Initialization extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {

        const visible = this.props.visible;

        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span className="nav-text">nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span className="nav-text">nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span className="nav-text">nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#000', padding: 0 }}>
                        <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                                style={{cursor: 'pointer'}}
                            />
                        </span>
                        <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>大屏管理系统</span>
                        <span style={{color:'#fff', float:'right', paddingRight:'2%'}}>
                            <img src={favicon} className="App-logo" alt="favicon" />
                        </span>
                        <span style={{color:'#fff', float:'right', fontSize:'1.4em'}}><CreateScreen /></span>

                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>

                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Web Design ©2017 Created by Abbott
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Initialization;



