import React from "react";
import Layout from '../comps/MyLayout';
import jsCookie from 'js-cookie';
import Router from "next/router";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: ''};
    jsCookie.remove('screenname'); 
  }
  componentDidMount() {
      Router.replace("/");
  }
  render() {
    return (
      <Layout>
        <div></div>
      </Layout>
    );
  }
}

export default Logout;