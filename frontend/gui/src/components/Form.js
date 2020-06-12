import React from 'react';
import { Form, Input, Button } from 'antd';

class CustomForm extends React.Component {
    handleFormSubmit = (event) => {
        event.preventDefault();
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;
        console.log(title, content)
    }
    render() {
        return (
            <div>
                <Form onSubmitCapture={this.handleFormSubmit}>
                    <Form.Item label="title">
                        <Input name="title" placeholder="Put a title here" />
                    </Form.Item>
                    <Form.Item label="content">
                        <Input name="content" placeholder="Put some content here" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" >Submit</Button>
                    </Form.Item>
                </Form>
            </div >
        )
    }
};
export default CustomForm;