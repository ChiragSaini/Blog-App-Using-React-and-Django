import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import * as actions from "../store/actions/Auth";
import { connect } from "react-redux";

const { Header, Content, Footer } = Layout;

const CustomLayout = (props) => {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to="/">
                            Posts
                        </Link>
                    </Menu.Item>
                    {
                        props.isAuthenticated ?
                            <Menu.Item key="2" onClick={props.logout}>
                                LogOut
                            </Menu.Item>
                            :
                            <Menu.Item key="2">
                                <Link to="/login">
                                    Login
                                </Link>
                            </Menu.Item>
                    }
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Articles</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">{props.children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>&copy;Chirag Saini</Footer>
        </Layout>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));