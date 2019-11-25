import Header from './Header';

const layoutStyle = {
  padding: 20,
  backgroundColor: '#f8f8f8',
  height: '100vh'
};

const Layout = props => (
  <div>
    <Header />
    <div style={layoutStyle}>
        {props.children}
    </div>
  </div>
);

export default Layout;