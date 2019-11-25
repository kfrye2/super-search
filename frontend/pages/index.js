//Main search page (stores/movies search)
import React from "react";
import Layout from '../comps/MyLayout';
import jsCookie from 'js-cookie';
import {getInfo} from '../lib/utils.js';
import {getUserInfo} from '../lib/utils.js';
import Link from 'next/link';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { zip: '', search:"", display: false, isTheater: false};
  }
  async handleUpdate(evt) {
    this.setState({search: evt.target.value,display: false});
    let data = null;
    const p = evt.target.value;
    if((jsCookie.get("screenname"))===undefined){
      data = await getInfo({search:p});
    } else {
      data = await getUserInfo({search:p,un:jsCookie.get("screenname")});
    }
    this.setState({display: data === null ? true : false, 
      isTheater: data.items.info[0].theater !=undefined ? true : false});
    return this.setState({data});
  }
  render() {
    return (
      <Layout>
        <div>
          <div>
            <div className="info">Great movies and food are just a click away</div>
            {jsCookie.get("screenname") ? 
            <div><br/><br/></div>
            : 
            <div className="info info-subtitle">
              To narrow your results to your area,&nbsp;
              <Link href="/login">
                <a title="User Login" className="link">login</a>
              </Link>
              <br/>
            </div>  }            
            <div className='input-holder'>
              <p><input className='input-box' 
                type='text' 
                placeholder="Enter search term" 
                value={this.state.search} 
                onChange={this.handleUpdate.bind(this)}/></p>
              {this.state.display ? 
                <p className='warning'><b>{this.state.search}</b> Not Found</p> 
                : null }
            </div>
          {this.state.data && this.state.search!='' ? 
            <div>
                <table id="food-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      {this.state.isTheater===true ? <th>Theater</th> : null}                 
                      <th>Type</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>Zipcode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.items.info.map((item, key)=>
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          {this.state.isTheater===true ? <td>{item.theater}</td> : null}  
                          <td>{item.type}</td>
                          <td>{item.address}</td>
                          <td>{item.city}</td>
                          <td>{item.zipcode}</td>
                        </tr>
                    )}
                  </tbody>
                </table>
            </div> : null }            
          </div> 
          
          <style jsx>{`
            #food-table {
              font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
              border-collapse: collapse;
              width: 100%;
            }            
            #food-table td, #food-table th {
              border: 1px solid #ddd;
              padding: 8px;
            }
            #food-table tr {
              font-family: "Verdana";
              font-size: 10px;
              padding: .75rem;
              vertical-align: top;
              border-top: 1px solid #dee2e6;
            }            
            #food-table tr:nth-child(even){
              background-color: #f2f2f2;
            }            
            #food-table tr:hover {
              background-color: rgba(208,244,253, 0.5);
            }            
            #food-table th {
              font-family: "Verdana";
              font-size: 14px;
              padding-top: 12px;
              padding-bottom: 12px;
              text-align: left;
              background-color: #28e0f4;
              color: #11334c;
            }
            .input-box {
              margin: auto auto !important;
              display: block;
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
            .info {
              font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
              color: #11334c;
              font-size: 20px;
              text-shadow: 2px 2px 5px #929292;
              text-align: center;
            }
            .info-subtitle{
              font-size: 15px;
            }
            .link {
              font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
              color: #28e0f4;
            }
          `}</style>
        </div>
      </Layout>
    );
  }
}

export default Home;
