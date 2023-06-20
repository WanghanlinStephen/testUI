import { Col, Grid, Row, Breadcrumb, Tabs, Tab } from 'react-bootstrap';
import NavBar from "./NavBar";
import ManageAccount from "./ManageAccount";
import ExistingAccounts from "./ExistingAccounts";
import createReactClass from 'create-react-class';

const Home = createReactClass({
  getInitialState: function() {
    return {
      tabName: 'manage-account'
    };
  },

  render: function() {
    return (
      <Row>
        <Col xs={2}>
          <div style={{borderRight: '1px solid #d9d9d9', height: '100vh'}}>
            <NavBar />
          </div>
        </Col>
        <Col xs={10}>
          <div style={{marginTop: '20px'}}>
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item >Manage Accounts</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <h2 style={{marginBottom: '40px'}}>Manage Account</h2>
          <Tabs defaultActiveKey={this.state.tabName}>
            <Tab eventKey={'manage-account'} title={'Create a new account'}>
              <ManageAccount />
            </Tab>
            <Tab eventKey={'existing-accounts'} title={'Existing accounts'}>
              <ExistingAccounts />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    )
  }
});

export default Home;
