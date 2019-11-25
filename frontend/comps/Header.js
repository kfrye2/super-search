import Link from 'next/link';
import jsCookie from 'js-cookie';

const linkStyle1 = {
  marginRight: 15,
  border: '1px solid #ff2540',
  backgroundColor: 'rgba(255,37,64,0.2)',
  borderRadius: '5px',
  padding: '10px',
  fontFamily: "Trebuchet MS, Arial, Helvetica, sans-serif",
  textDecoration: 'none',
  color: '#ff2540'
};
const linkStyle2 = {
  marginRight: 15,
  border: '1px solid #28e0f4',
  backgroundColor: 'rgba(40,222,244,0.1)',
  borderRadius: '5px',
  padding: '10px',
  fontFamily: "Trebuchet MS, Arial, Helvetica, sans-serif",
  textDecoration: 'none',
  color: '#28e0f4'
};
const navBar = {
  padding: '20px',
  background: '#11334c',
  textAlign: 'right',
  boxShadow: 'box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
};
const navUsername = {
  color: 'white',
  float: 'left',
  fontFamily: "Trebuchet MS, Arial, Helvetica, sans-serif",
};

const Header = () => (
  <div style={navBar}>    
    <div>
      {jsCookie.get("screenname") ? 
        <span style={navUsername}>Welcome, {jsCookie.get("screenname")}</span> 
        : null}
      <Link href="/">
        <a title="Search" style={linkStyle1}>Search</a>
      </Link>
      {jsCookie.get("screenname") ? 
        <Link href="/logout">
          <a title="User Logout" style={linkStyle2}>Logout</a>
        </Link> 
        : 
        <Link href="/login">
          <a title="User Login" style={linkStyle2}>Login</a>
        </Link>
      }      
    </div>
  </div>
);

export default Header;