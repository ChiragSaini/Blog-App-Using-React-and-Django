import React from 'react';
import axios from 'axios';

import { Card, Button } from 'antd';
import CustomForm from '../components/Form';

class ArticleDetail extends React.Component {
    state = {
        article: {}
    }
    componentDidMount() {
        const articleID = this.props.match.params.articleID;
        console.log("ArticleID:", articleID);
        axios.get(`http://127.0.0.1:8000/api/${articleID}/`)
            .then(res => {
                this.setState({
                    article: res.data
                });
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }

    handleDelete = (event) => {
        const articleID = this.props.match.params.articleID;
        console.log("ArticleID:", articleID);
        axios.delete(`http://127.0.0.1:8000/api/${articleID}`);
        this.props.history.push("/");
    }

    render() {
        return (
            <>
                <Card title={this.state.article.title} >
                    <p>{this.state.article.content}</p>
                </Card>
                <h3>Update Article</h3>
                {console.log("ArticleID in component:", this.props.match.params.articleID)}
                <CustomForm requestType="put" articleID={this.props.match.params.articleID} btnText="Update" />
                <form onSubmit={this.handleDelete} >
                    <Button htmlType="submit" type="danger">Delete</Button>
                </form>
            </>
        );
    }
}
export default ArticleDetail;