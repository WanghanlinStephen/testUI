import {Checkbox, Table, Alert} from "react-bootstrap";
import DownIcon from '../assets/down.png';
import createReactClass from 'create-react-class';
import SortPointer from "./SortPointer";

const AccountTable = createReactClass({
  getInitialState: function() {
    return {
    };
  },

  handleSort(key, sort) {
    this.props.handleSort(key, sort);
  },


  render: function() {

    if (this.props.accounts.length === 0) {
      return (
        <Alert bsStyle="warning">
          No Accounts Data
        </Alert>
      )
    }

    return (
      <div>
        <Table responsive>
          <thead>
          <tr>
            <th>
              <input
                onChange={e => {
                  if (e.target.checked) {
                    this.props.handleSelectAccounts(this.props.accounts.map(account => account.id))
                  } else {
                    this.props.handleCancelSelectAccounts(this.props.accounts.map(account => account.id))
                  }
                }}
                checked={this.props.selectedAccounts.length === this.props.accounts.length}
                type={'checkbox'}/>
            </th>
            <th>
              Member Name
              <SortPointer
                handleSort={(sort) => {
                  this.handleSort('memberName', sort)
                }}
              />
            </th>
            <th>
              Region
              <SortPointer
                handleSort={(sort) => {
                  this.handleSort('region', sort)
                }}
              />
            </th>
            <th>
              Account Type
              <SortPointer
                handleSort={(sort) => {
                  this.handleSort('accountType', sort)
                }}
              />
            </th>
            <th>
              POSIX Group
              <SortPointer
                handleSort={(sort) => {
                  this.handleSort('posixGroup', sort)
                }}
              />
            </th>
            <th>
              Read-only

            </th>
            <th>
              Requested By
              <SortPointer
                handleSort={(sort) => {
                  this.handleSort('requestedBy', sort)
                }}
              />
            </th>
            <th>
              Requested On
              <SortPointer
                handleSort={(sort) => {
                  this.handleSort('requestedOn', sort)
                }}
              />
            </th>
            <th>
              Odin Material Set
            </th>
          </tr>
          </thead>
          <tbody>
          {this.props.accounts.map(account => {
            return (
              <tr key={account.id}>
                <td>
                  <input
                    onChange={e => {
                      if (e.target.checked) {
                        this.props.handleSelectAccounts([account.id])
                      } else {
                        this.props.handleCancelSelectAccounts([account.id])
                      }
                    }}
                    checked={this.props.selectedAccounts.includes(account.id)}
                    type={'checkbox'}/>
                </td>
                <td>
                  {account.memberName}
                </td>
                <td>
                  {account.region}
                </td>
                <td>
                  {account.accountType}
                </td>
                <td>
                  {account.posixGroup}
                </td>
                <td>
                  {account.readOnly ? 'Yes' : 'No'}
                </td>
                <td>
                  {account.requestedBy}
                </td>
                <td>
                  {account.requestedOn}
                </td>
                <td>
                  {account.odinMaterialSet}
                </td>
              </tr>
            )
          })}
          </tbody>
        </Table>
      </div>
    );
  }
});

export default AccountTable;
