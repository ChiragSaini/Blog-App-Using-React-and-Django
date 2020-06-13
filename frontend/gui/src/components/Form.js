import React from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';

class CustomForm extends React.Component {

    handleFormSubmit = (event, requestType, articleID) => {
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;
        console.log(title, content, articleID);
        switch (requestType) {
            case 'post':
                return axios.post("http://127.0.0.1:8000/api/", {
                    'title': title,
                    'content': content
                })
                    .then(window.location.reload(false))
                    .catch(err => console.log(err));
            case 'put':
                return axios.put(`http://127.0.0.1:8000/api/${articleID}/`, {
                    'title': title,
                    'content': content
                })
                    .then(window.location.reload(false))
                    .catch(err => console.log(err));
        }
    }
    render() {
        return (
            <div>
                <Form onSubmitCapture={(event) => this.handleFormSubmit(
                    event,
                    this.props.requestType,
                    this.props.articleID
                )}>
                    <Form.Item label="title">
                        <Input name="title" placeholder="Put a title here" />
                    </Form.Item>
                    <Form.Item label="content">
                        <Input name="content" placeholder="Put some content here" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" >{this.props.btnText}</Button>
                    </Form.Item>
                </Form>
            </div >
        )
    }
};
export default CustomForm;