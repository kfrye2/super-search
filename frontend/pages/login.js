//Search for a user
import React from "react";
import {loginCheck} from '../lib/login.js';
import {loginNew} from '../lib/login.js';
import Layout from '../comps/MyLayout';
import Link from 'next/link';
import jsCookie from 'js-cookie';
import Router from "next/router";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={searchusernm:"", searchpassword: "", zip:"", message: "", 
      createAccount:false, switch:"Create Account"};
  }

  handleUpdateUN(evt) {
    this.setState({searchusernm: evt.target.value});
  }

  handleUpdatePW(evt) {
    this.setState({searchpassword: evt.target.value});
  }

  handleUpdateZip(evt) {
    this.setState({zip: evt.target.value});
  }

  async handleSubmit(evt){
    const check = JSON.stringify({
      username:this.state.searchusernm,
      password:this.state.searchpassword,
      zipcode:this.state.zip});
    var user = await loginCheck(check);
    if(user.info.message==3 && this.state.zip!="") {
      user = await loginNew(check);
    }
    if(user.info.name!=null) {
      this.setState({user:user.info});
      jsCookie.set("screenname", user.info.name);
      Router.replace("/");
    }    
    this.setState({message:user.info.message});
  }

  async handleShowCreate(evt) {
    const tf = !this.state.createAccount;
    this.setState({createAccount:tf});
    if(this.state.switch=="Create Account"){
      this.setState({switch:"Sign-In to Account", searchusernm:"", searchpassword: "", message:""});
    } else {
      this.setState({switch:"Create Account", searchusernm:"", searchpassword: "", message:""});
    }
  }

  render() {
    return (
      <Layout>
        <div>
          <br /><br /><br />
          <div>
            <div className='input-wrapper'>
              <div className='inner-wrapper'>
                <label for='username'>&nbsp;&nbsp;Username:&nbsp;</label>
                <input
                  type="text"
                  className='input-box'
                  id='username'
                  value={this.state.searchusernm}
                  onChange={this.handleUpdateUN.bind(this)}
                />
                <br /><br />
                <label for='password'>&nbsp;&nbsp;Password:&nbsp;&nbsp;</label>
                <input
                  type="password"
                  className='input-box'
                  id='password'
                  value={this.state.searchpassword}
                  onChange={this.handleUpdatePW.bind(this)}
                />
                <br /><br />
                {this.state.createAccount==true ? (
                  <div>
                    <label for='zipcode'>&nbsp;&nbsp;Zipcode:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <input
                      type="text"
                      className='input-box'
                      id='zipcode'
                      value={this.state.zip}
                      onChange={this.handleUpdateZip.bind(this)}
                    /></div>) : null}
              </div>
              <div className='btn-group'>
                <button onClick={this.handleSubmit.bind(this)} className="button-style">
                  Submit
                </button>            
                <button onClick={this.handleShowCreate.bind(this)} className="button-style">
                  {this.state.switch}
                </button>
              </div>
            </div>
          </div>
          <br /><br /> <br />
          {this.state.message===2 && this.state.createAccount==false ? (
            <div>
              <div>
                <div className='speech-bubble'>Password Incorrect</div><br />
              </div>
              <br /><br /><br />
              <div><Link href="/"><a>&#8592;&nbsp;Search without logging in</a></Link></div>
            </div>
          ) : null}
          {this.state.message===3 && this.state.createAccount==false ? (
            <div>
              <div>
                <br />
                <div className='speech-bubble'>Username Not Found</div><br />
              </div>
              <br /><br /><br />
              <div><Link href="/"><a>&#8592;&nbsp;Search without logging in</a></Link></div>
            </div>
          ) : null}
          {this.state.message===5 && this.state.createAccount==true ? (
            <div>
              <div>
                <div className='speech-bubble'>User not Created</div><br />
              </div>
              <br /><br /><br />
              <div><Link href="/"><a>&#8592;&nbsp;Search without signing up</a></Link></div>
            </div>
          ) : null}
          {(this.state.message===6 || this.state.message===2) && this.state.createAccount==true ? (
            <div>
              <div>
                <br />
                <div className='speech-bubble'>Username is Already Taken</div><br />
              </div>
              <br /><br /><br />
              <div><Link href="/"><a>&#8592;&nbsp;Search without signing up</a></Link></div>
            </div>
          ) : null}
          
          <style jsx>{`
          a {
            text-decoration: none;
            color: #11334c;
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            font-weight: 600;
          }
          .btn-group button {
            background-color: #5b6e7e;
            border: none !important;
            color: white;
            padding: 20px;
            cursor: pointer;
            float: left;
            width: 50%;
            border-radius: 0 0 12px 0;
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
          }
          .btn-group button:not(:last-child) {
            background-color: #28e0f4 !important;
            border-right: none;
            border-radius: 0 0 0 12px;
          }
          .btn-group:after {
            content: "";
            clear: both;
            display: table;
          }
          .btn-group button:hover {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
          }
          .input-wrapper {
            margin: auto auto;
            width: 500px;
            border-radius: 12px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            background-color: white;
          }
          .input-box {
            padding: 10px;
            margin: 10px;
            border-radius: 7px;
            text-align: center;
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            font-size: "12px";
            box-shadow: 2px 2px 5px #888888;
            border: 2px solid #11334c !important;
            width: 250px;
          }
          .inner-wrapper {
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 100%;
            padding: 50px 40px 30px 40px;
          }
          label {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            font-size: 15px;
            color: white;
            background-color: #11334c;
            padding: 10px 0 10px 0;
            margin: 0 0 0 14px;
            border-radius: 5px;
          }
          .speech-bubble {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            color: white;
            position: relative;
            background: rgba(255,37,64,0.8);
            border-radius: 12px;
            width: 150px;
            margin: auto auto;
            text-align: center;
            padding: 40px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
          }
          .speech-bubble:after {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            width: 0;
            height: 0;
            border: 20px solid transparent;
            border-bottom-color: rgba(255,37,64,0.8);
            border-top: 0;
            border-left: 0;
            margin-left: -10px;
            margin-top: -20px;
          }
          .correct-speech-bubble {
            background: rgba(146,208,80,0.8) !important;
          }
          .correct-speech-bubble:after {
            border-bottom-color: rgba(146,208,80,0.8) !important;
          }
          `}</style>
        </div>
      </Layout>
    );
  }
}

export default Login;
