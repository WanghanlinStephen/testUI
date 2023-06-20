import { Button } from 'react-bootstrap';
import Collapse from "./Collapse";
import createReactClass from 'create-react-class';

const NavBar = createReactClass({
  render: function() {
    return (
      <div style={{padding: '10px'}}>
        <h3 style={{marginBottom: '40px'}}>INFAUTO-LEGACY-TEST</h3>
        <Collapse title={'Manage Requests'}>
          <p>
            <Button href={'https://www.google.com'} bsStyle={"link"}>Documentation</Button>
          </p>
          <p>
            <Button href={'https://www.google.com'} bsStyle={"link"}>Manage Accounts</Button>
          </p>
          <p>
            <Button href={'https://www.google.com'} bsStyle={"link"}>
              Report A Problem
            </Button>
          </p>
        </Collapse>

        <Collapse title={'Services provided'}>
          <p>
            <Button href={'https://www.google.com'} bsStyle={"link"}>
              Repropose Tool
            </Button>
          </p>
          <p>
            <Button href={'https://www.google.com'} bsStyle={"link"}>
              Release Tool
            </Button>
          </p>
          <p>
            <Button href={'https://www.google.com'} bsStyle={"link"}>
              Host Swap Tool
            </Button>
          </p>
          <p>
            <Button href={'https://www.google.com'} bsStyle={"link"}>
              Hostclass Browser
            </Button>
          </p>
          <p>
            <Button href={'https://www.google.com'} bsStyle={"link"}>
              Workflow Management
            </Button>
          </p>
          <p>
            <Button href={'https://www.google.com'} bsStyle={"link"}>
              Where's My Host
            </Button>
          </p>
          <p>
            <Button href={'https://www.google.com'} bsStyle={"link"}>
              Repurpose Diskwipe Exception
            </Button>
          </p>
          <p>
            <Button href={'https://www.google.com'} bsStyle={"link"}>
              Hailstone Transfer Tool
            </Button>
          </p>
        </Collapse>
      </div>
    );
  }
});

export default NavBar;
