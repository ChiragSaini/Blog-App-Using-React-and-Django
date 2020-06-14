import React from 'react';
import { connect } from "react-redux";
import {
    Form,
    Input,
    Button,
} from 'antd';
import { NavLink } from 'react-router-dom';
import { UserOutlined, LockOutlined, MailOutlined, CheckOutlined } from '@ant-design/icons';
import * as actions from "../store/actions/Auth";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const RegistrationForm = (props) => {
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form: ', values);
        props.onAuth(
            values.username,
            values.email,
            values.password,
            values.confirm)
        props.history.push("/");
    };
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError>
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}>
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback>
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="password" />
            </Form.Item>
            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}>
                <Input.Password prefix={<CheckOutlined className="site-form-item-icon" />} placeholder="Confirm password" />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                    SignUp
                </Button>
                Or &nbsp;
                <NavLink style={{ marginRight: "10px" }} to="/login/" >
                    Login
                </NavLink>
            </Form.Item>
        </Form>
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
        onAuth: (username, email, password1, password2) => {
            dispatch(actions.authSignUp(username, email, password1, password2));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);