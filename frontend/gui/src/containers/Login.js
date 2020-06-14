import React from 'react';
import { connect } from 'react-redux'
import { Form, Input, Button, Spin } from 'antd';
import { NavLink } from 'react-router-dom';
import * as actions from "../store/actions/Auth";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const LoginForm = (props) => {
    const onFinish = values => {
        props.onAuth(values.username, values.password)
        props.history.push("/");
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }
    return (
        <>
            {errorMessage}
            {
                props.loading ?
                    <Spin size="large" />
                    :
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                Login
                            </Button>
                            Or &nbsp;
                            <NavLink style={{ marginRight: "10px" }} to="/signup/" >
                                SignUp
                            </NavLink>
                        </Form.Item>
                    </Form>
            }
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (username, password) => {
            dispatch(actions.authLogin(username, password));
        } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);