import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import BaseRouter from './routes';
import 'antd/dist/antd.css';

import * as actions from "./store/actions/Auth";
import CustomLayout from "./containers/Layout";

class App extends React.Component {

  componentDidMount(){
    this.props.onTryAutpSignUp();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <CustomLayout {...this.props} >
            <BaseRouter />
          </CustomLayout>
        </BrowserRouter >
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutpSignUp: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
