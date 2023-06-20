import {Button, Panel, DropdownButton, MenuItem, FormControl, Tooltip, OverlayTrigger} from 'react-bootstrap';
import createReactClass from 'create-react-class';


const TooltipWrapper = ({message, children}) => {
  return <OverlayTrigger placement={'top'} overlay={<Tooltip>
    <strong>{message}</strong>
  </Tooltip>}>
    {children}
  </OverlayTrigger>
}

const ManageAccount = createReactClass({
  getInitialState: function() {
    return {
      accountTypes: ['iam_arn', 'basic_auth_user'],
      accountNames: ['name1', 'name2', 'name3'],
      odinMaterialSet: '',
      posixGroups: ['group1', 'group2', 'group3'],
      regions: ['USA', 'AUS', 'CHINA'],

      accountType: '',
      accountName: '',
      posixGroup: '',
      region: ''
    };
  },

  handleOdinMaterialSetChange: function(e) {
    this.setState({
      odinMaterialSet: e.target.value
    });
  },

  handleClickAccountType: function (type) {

    this.setState({
      accountType: type
    })
  },

  handleClickAccountName: function (name) {
    this.setState({
      accountName: name
    })
  },

  handleClickPosixGroup: function (group) {
    this.setState({
      posixGroup: group
    })
  },

  handleClickRegion: function (region) {
    this.setState({
      region: region
    })
  },

  handleSubmit: function (e) {
    // submit create
    console.log(this.state)
  },

  render: function() {
    return (
      <div style={{ marginTop: '20px' }}>
        <Panel>
          <Panel.Heading>
            <h4>
              Create a new account
            </h4>
          </Panel.Heading>
          <Panel.Body>
            <div>
              <h5 style={{ fontWeight: 'bold', marginBottom: '0px' }}>
                Account Type
                <small>
                  <TooltipWrapper message={'This is info message'}>
                    <Button href={'http://xx.com'} bsStyle={'link'}>Info</Button>
                  </TooltipWrapper>
                </small>
              </h5>
              <p style={{ color: 'grey', marginTop: '0px' }}>
                Account type, basic auth or IAM user (SigV4).
              </p>
              <DropdownButton
                bsSize={''}
                title={this.state.accountType || "Choose an account type"}
              >
                {this.state.accountTypes.map(type => {
                  return (
                    <MenuItem
                      active={this.state.accountType === type}
                      onClick={() => {
                        this.handleClickAccountType(type)
                      }}
                      eventKey={type}
                      key={type}>
                      {type}
                    </MenuItem>
                  );
                })}
              </DropdownButton>
            </div>

            <div>
              <h5 style={{ fontWeight: 'bold', marginBottom: '0px' }}>
                Account name
                <small>
                  <TooltipWrapper message={'This is info message'}>
                    <Button href={'http://xx.com'} bsStyle={'link'}>Info</Button>
                  </TooltipWrapper>
                </small>
              </h5>
              <p style={{ color: 'grey', marginTop: '0px' }}>
                Your account will act as a member of this POSIX group for the purposes of our authorization checks. If the Read-only flag is disabled, this account will be able to repurpose or swap hosts under hostclasses that this group is listed as an Operator of.
              </p>
              <DropdownButton
                bsSize={''}
                title={this.state.accountName || 'Choose an account name'}
              >
                {this.state.accountNames.map(name => {
                  return (
                    <MenuItem
                      onClick={() => {
                        this.handleClickAccountName(name)
                      }}
                      active={this.state.accountName === name}
                      eventKey={name}
                      key={name}>
                      {name}
                    </MenuItem>
                  );
                })}
              </DropdownButton>
            </div>

            {this.state.accountType === 'basic_auth_user' && (
              <div>
                <h5 style={{ fontWeight: 'bold', marginBottom: '0px' }}>
                  Odin material setinfo
                  <small>
                    <TooltipWrapper message={'This is info message'}>
                      <Button href={'http://xx.com'} bsStyle={'link'}>Info</Button>
                    </TooltipWrapper>
                  </small>
                </h5>
                <p style={{ color: 'grey', marginTop: '0px' }}>
                  We use the Odin material set to validate your account credentials at runtime.
                </p>
                <FormControl
                  value={this.state.odinMaterialSet}
                  onChange={this.handleOdinMaterialSetChange}
                  type="text"
                />
              </div>
            )}

            <div>
              <h5 style={{ fontWeight: 'bold', marginBottom: '0px' }}>
                Region
                <small>
                  <TooltipWrapper message={'This is info message'}>
                    <Button href={'http://xx.com'} bsStyle={'link'}>Info</Button>
                  </TooltipWrapper>
                </small>
              </h5>
              <p style={{ color: 'grey', marginTop: '0px' }}>
                this will be the region where you use this account in
              </p>
              <DropdownButton
                bsSize={''}
                title={this.state.region || 'Choose region'}
              >
                {this.state.regions.map(region => {
                  return (
                    <MenuItem
                      active={this.state.region === region}
                      onClick={() => {
                        this.handleClickRegion(region);
                      }}
                      eventKey={region} key={region}>
                      {region}
                    </MenuItem>
                  );
                })}
              </DropdownButton>
            </div>

            <div>
              <h5 style={{ fontWeight: 'bold', marginBottom: '0px' }}>
                Posix group
                <small>
                  <TooltipWrapper message={'This is info message'}>
                    <Button href={'http://xx.com'} bsStyle={'link'}>Info</Button>
                  </TooltipWrapper>
                </small>
              </h5>
              <p style={{ color: 'grey', marginTop: '0px' }}>
                Your account will act as a member of this PosIX group for the purposes of our authorization checks. If the Read-only flag is disabled, this account will be able to repurpose or swap hosts under hostclasses that this group is listed as an Operator of.
              </p>
              <DropdownButton
                bsSize={''}
                title={this.state.posixGroup || 'Choose and posix group'}
              >
                {this.state.posixGroups.map(group => {
                  return (
                    <MenuItem
                      active={this.state.posixGroup === group}
                      onClick={() => {
                        this.handleClickPosixGroup(group);
                      }}
                      eventKey={group} key={group}>
                      {group}
                    </MenuItem>
                  );
                })}
              </DropdownButton>
            </div>
            <div style={{marginTop: '30px'}}>
              <Button
                onClick={this.handleSubmit}
                bsStyle="success">Submit</Button>
            </div>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
});

export default ManageAccount;
