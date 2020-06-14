import React from 'react';
import { Route } from 'react-router-dom';
import ArticleList from "./containers/ArticleListView";
import ArticleDetail from "./containers/ArticleDetailView";
import LoginForm from "./containers/Login";
import SignUp from "./containers/SignUp";

const BaseRouter = () => (
    <div>
        <Route exact path="/"  component={ArticleList} />
        <Route exact path="/articles/:articleID" component={ArticleDetail} />
        <Route exact path="/login/" component={LoginForm} />
        <Route exact path="/signup/" component={SignUp} />
    </div>
);

export default BaseRouter;